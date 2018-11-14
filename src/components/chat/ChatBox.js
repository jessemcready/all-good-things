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
    const { socket, user } = this.props
    const { messages } = this.state

    socket.on('new message', messageObj => {
      const index = messages.findIndex( userObj => userObj.email === user.email )
      if( index !== -1 ){
        const userMessages = messages[index]
        this.setState({
          messages: [
            ...this.state.messages.slice(0, index),
            Object.assign({}, userMessages, { messages: [...userMessages.messages, messageObj]}),
            ...this.state.messages.slice(index + 1)
          ]
        })
      } else {
        this.setState({
          messages: [
            ...this.state.messages,
            { email: user.email, messages: [messageObj] }
          ]
        })
      }
    })
  }

  componentWillUnmount(){
    state = this.state
  }

  handleChange = e => this.setState({ message: e.target.value })

  handleSubmit = message => {
    const { socket, currentUser, user } = this.props
    const { messages } = this.state
    const messageObj = {
      name: currentUser.name,
      content: message,
      email: user.email
    }
    const index = messages.findIndex( userObj => userObj.email === user.email )
    if( index !== -1 ){
      const userMessages = messages[index]
      debugger
      this.setState({
        messages: [
          ...this.state.messages.slice(0, index),
          Object.assign({}, userMessages, { messages: [...userMessages.messages, messageObj]}),
          ...this.state.messages.slice(index + 1)
        ],
        message: ''
      })
      socket.emit('message', messageObj)
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          { email: user.email, messages: [messageObj] }
        ],
        message: ''
      })
      socket.emit('message', messageObj)
    }
  }

  messagesToDisplay = () => {
    const { user } = this.props
    const { messages } = this.state

    const filtered =  messages.filter( message => message.email === user.email )

    return filtered.map( message => message.messages ).flat()
  }

  render() {
    const { message } = this.state
    const { user } = this.props
    const messages = this.messagesToDisplay()
    
    return (
      <Segment>
        <Header>Chat with {user.name}</Header>
        <List className='friendList'>
          { messages.length !== 0 ?
            messages.map(messageObj => (
            <List.Item>{messageObj.name}: {messageObj.content}</List.Item>
          )) : null
        }
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
