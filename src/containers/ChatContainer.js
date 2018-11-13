import React, { Component } from 'react'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'

class ChatContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: '',
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
    this.socket.emit('addUser', { email: user.email, socketId: this.socket.id })
  }

  render() {
    const { response } = this.state
    debugger
    return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0'
      }}>{response.message}</div>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps)(ChatContainer);
