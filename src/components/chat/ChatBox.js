import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, List, Input, Form } from 'semantic-ui-react'

class ChatBox extends Component {
  state = {
    message: '',
    messages: []
  }

  handleChange = e => this.setState({ message: e.target.value })

  handleSubmit = message => {
    const { socket, currentUser, user } = this.props
    const messageObj = {
      name: currentUser.name,
      content: message,
      email: user.email
    }
    this.setState({ messages: [messageObj, ...this.state.messages], message: '' })
    socket.emit('message', messageObj)
  }

  render() {
    const { user } = this.props
    const { message, messages } = this.state
    debugger
    return (
      <Segment>
        <List style={{overflow: 'scroll', height: '200px'}}>
          {messages.map(message => <List.Item>{message.name}: {message.content}</List.Item>)}
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
