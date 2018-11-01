import React from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { email, password } = this.state
    const { handleLogin, handleLinkClick } = this.props
    return(
      <Form onSubmit={(event) => handleLogin(event, this.state)}>
        <Header>Login</Header>
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
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange} />
        </Form.Field>
        <Button fluid>Log In</Button>
        <div onClick={handleLinkClick}>
          <h3>Need an account? Sign Up</h3>
        </div>
      </Form>
    )
  }
};

export default LoginForm;
