import React from 'react';
import { Form, Input, Button, Header, Card } from 'semantic-ui-react'

class SignupForm extends React.Component {
  constructor(props){
    super(props)
    if(props.user){
      this.state = {
        name: props.user.name,
        email: props.user.email,
        password: '',
        preFilled: true
      }
    } else {
      this.state = {
        name: '',
        email: '',
        password: '',
        preFilled: false
      }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const { name, email, password, preFilled } = this.state
    const { handleSignup, handleLinkClick } = this.props
    let originalName
    if(preFilled){
      originalName = this.props.user.name
    }
    return(
      <Card centered>
        <Card.Content>
          <Form onSubmit={event => handleSignup(event, this.state)}>
            {
              preFilled ?
              <Header>Edit {originalName}</Header> :
              <Header>Sign Up</Header> }
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
            {
              this.props.user ?
              <Button fluid color='green' basic>Edit</Button> :
              <div>
                <Button fluid>Sign Up</Button>
                <div onClick={handleLinkClick}>
                <h3>Already have an account? Login</h3>
                </div>
              </div>
            }
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default SignupForm;
