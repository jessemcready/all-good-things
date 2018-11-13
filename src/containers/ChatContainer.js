import React, { Component } from 'react'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'
import FriendsList from '../components/chat/FriendsList'

class ChatContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: '',
      selectedUser: {},
      message: '',
      messages: []
    }
    this.socket = socketIOClient('http://127.0.0.1:4001')
  }

  componentDidMount(){
    this.socket.emit('here')
    this.socket.on('user connected', data => this.setState({ response: data }))
  }

  componentDidUpdate(){
    const { user } = this.props
    this.socket.emit('addUser', {
      name: user.name,
      email: user.email,
      socketId: this.socket.id
    })
  }

  handleUserSelect = follower => {
    this.setState({ selectedUser: follower })
  }

  render() {
    const { response } = this.state
    const { user } = this.props
    const styles = { position: 'fixed', bottom: '0', left: '0' }
    debugger
    return (
      <div style={styles}>
        <FriendsList user={user} onUserSelect={this.handleUserSelect} />
      </div>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps)(ChatContainer);
