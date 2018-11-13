import React, { Component } from 'react';
import { Form, Input, Button, Header, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    const { email, password } = this.state
    const { handleLogin, handleLinkClick, errors } = this.props

    return(
      <Segment raised>
          <Form error onSubmit={(event) => handleLogin(event, this.state)} >
            <Header className='robotoFam'>Login</Header>
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
            {
              errors !== '' ?
              <Message error header='Login Failed' content={errors} className='robotoFam' /> :
              null
            }
            <Button fluid color='blue'>Log In</Button>
            <Message onClick={handleLinkClick}>
              <h3 className='robotoFam'>Need an account? Sign Up</h3>
            </Message>
          </Form>
      </Segment>
    )
  }
};

export default LoginForm;
