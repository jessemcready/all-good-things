import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/users'
import { Form, Input, Button, Header, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = { email: '', password: '' }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleLogin = (event, formData) => this.props.loginUser(formData)

  render(){
    const { email, password } = this.state
    const { handleLinkClick, error, authenticatingUser, failedLogin } = this.props

    return(
      <Segment raised>
          <Form error={failedLogin} loading={authenticatingUser} onSubmit={(event) => this.handleLogin(event, this.state)} >
            <Header className='robotoFam'>Log In</Header>
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
            <Message error header={failedLogin ? error : null} className='robotoFam' />
            <Button fluid color='blue'>Log In</Button>
            <Message onClick={handleLinkClick}>
              <h3 className='robotoFam'>Need an account? Sign Up</h3>
            </Message>
          </Form>
      </Segment>
    )
  }
};

const mapStateToProps = ({ users: { authenticatingUser, failedLogin, error, loggedIn }}) => {
  return { authenticatingUser, failedLogin, error, loggedIn }
}

export default connect(mapStateToProps, { loginUser })(LoginForm);
