import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signUpUser } from '../../actions/users'
import { Form, Input, Button, Header, Segment, Message } from 'semantic-ui-react'

class SignupForm extends Component {
  constructor(props){
    super(props)
    if(props.user){
      this.state = {
        name: props.user.name,
        email: props.user.email,
        password: '',
        profileUrl: props.user.profileUrl,
        preFilled: true
      }
    } else {
      this.state = {
        name: '',
        email: '',
        password: '',
        profileUrl: '',
        preFilled: false
      }
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleImage = event => this.setState({ profileUrl: event.target.files[0] })

  handleSignup = (event, formData) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/jessemcready/image/upload'
    const upload_preset = 'wshmuzkt'
    const file = formData.profileUrl
    const formInfo = new FormData()
    formInfo.append('file', file)
    formInfo.append('upload_preset', upload_preset)
    fetch(cloudUrl, {
      method: 'POST',
      body: formInfo
    }).then( res => res.json()).then( data => {
      const user = { ...formData, profile_url: data.secure_url }
      this.props.signUpUser(user)
    })
  }

  render(){
    const { name, email, password, preFilled } = this.state
    const { handleLinkClick, authenticatingUser, failedLogin, error, loggedIn } = this.props

    let originalName
    if(preFilled){
      originalName = this.props.user.name
    }
    return(
      <Segment centered raised>
          <Form error={failedLogin} loading={authenticatingUser} onSubmit={event => this.handleSignup(event, this.state)}>
            {
              preFilled ?
              <Header className='robotoFam'>Edit {originalName}</Header> :
              <Header className='robotoFam'>Sign Up</Header>
            }
            <Form.Field className='robotoFam'>
              <Input
                placeholder='Name'
                name='name'
                value={name}
                onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='robotoFam'>
              <Input
                placeholder='Email'
                name='email'
                value={email}
                onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='robotoFam'>
              <Input
                placeholder='Password'
                name='password'
                value={password}
                type='password'
                onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='robotoFam'>
              <Input
                placeholder='Profile Image'
                name='profileUrl'
                type='file'
                onChange={this.handleImage} />
            </Form.Field>
            <Message error header={ failedLogin ? error : null } className='robotoFam' />
            {
              this.props.user ?
              <Button fluid color='teal' basic className='robotoFam'>Confirm Edit</Button> :
              <div>
                <Button fluid color='blue' className='robotoFam'>Sign Up</Button>
                <Message onClick={handleLinkClick}>
                <h3 className='robotoFam'>Already have an account? Login</h3>
                </Message>
              </div>
            }
          </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ({ users: { user, authenticatingUser, failedLogin, error, loggedIn }}) => {
  return { authenticatingUser, failedLogin, error, loggedIn }
}

export default connect(mapStateToProps, { signUpUser })(SignupForm);
