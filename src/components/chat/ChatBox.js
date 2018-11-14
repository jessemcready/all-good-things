import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, List, Input, Form, Header } from 'semantic-ui-react'

let state = {
  message: '',
  messages: []
}

class ChatBox extends Component {
  constructor(props){
    super(props)
    this.state = state
  }

  componentDidMount() {
    const { socket } = this.props

    socket.on('new message', messageObj => {
      this.setState({ messages: [...this.state.messages, messageObj]})
    })
  }

  componentWillUnmount(){
    state = this.state
  }

  handleChange = e => this.setState({ message: e.target.value })

  handleSubmit = message => {
    const { socket, currentUser, user } = this.props
    const messageObj = {
      name: currentUser.name,
      content: message,
      email: user.email
    }
    this.setState({ messages: [...this.state.messages, messageObj], message: '' })
    socket.emit('message', messageObj)
  }

  render() {
    const { message, messages } = this.state
    const { user } = this.props

    return (
      <Segment>
        <Header>Chat with {user.name}</Header>
        <List className='friendList'>
          {messages.map(messageObj => (
            <List.Item>{messageObj.name}: {messageObj.content}</List.Item>
          ))}
        </List>
        <Form onSubmit={event => this.handleSubmit(message)}>
          <Input onChange={this.handleChange} name='message' value={message} />
        </Form>
      </Segment>
    );
  }

}

const mapStateToProps = ({ users: { user }}) => ({ currentUser: user})

export default connect(mapStateToProps)(ChatBox);
