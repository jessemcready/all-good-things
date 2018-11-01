import React from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react'

class SignupForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { name, email, password } = this.state
    const { handleSignup, handleLinkClick } = this.props
    return(
      <Form onSubmit={event => handleSignup(event, this.state)}>
        <Header>Sign Up</Header>
        <Form.Field>
          <Input
            placeholder='Name'
            name='name'
            value={name}
            onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder='Email'
            name='email'
            value={email}
            onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder='Password'
            name='password'
            value={password}
            type='password'
            onChange={this.handleChange} />
        </Form.Field>
        <Button fluid>Sign Up</Button>
        <div onClick={handleLinkClick}>
          <h3>Already have an account? Login</h3>
        </div>
      </Form>
    )
  }
}

export default SignupForm;
