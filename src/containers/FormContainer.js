import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import LoginForm from '../components/form/LoginForm'
import SignupForm from '../components/form/SignupForm'
import { loginUser, signUpUser } from '../actions/users'
import { getFeed } from '../actions/posts'
import FetchAdapter from '../adapters/FetchAdapter'

class FormContainer extends Component {
  state = {
    isLoginForm: true,
    errors: ''
  }

  handleFormSwitch = () => {
    const { isLoginForm } = this.state
    this.setState({ isLoginForm: !isLoginForm, errors: '' })
  }

  handleLogin = (event, formData) => {
    // FetchAdapter.loginUser(formData).then( user => {
    //   if(user.message){
    //     this.setState({ errors: user.message })
    //   } else {
    //     localStorage.setItem('jwt', user.jwt)
    //     loginUser(user)
    //     getFeed()
    //   }
    // })
    this.props.loginUser(formData)
  }

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
      // FetchAdapter.signupUser(formData, data.secure_url).then(user => {
      //   if(user.errors){
      //     this.setState({ errors: user.errors })
      //   } else {
      //     localStorage.setItem('jwt', user.jwt)
      //     loginUser(user)
      //     getFeed()
      //   }
      // })
      const user = { ...formData, profile_url: data.secure_url }
      this.props.signUpUser(user)
    })
  }

  render() {
    const { errors, isLoginForm } = this.state
    return (
      <Fragment>
        <Grid container columns={3} className='formGrid'>
          <Grid.Row centered stretched verticalAlign='middle' className='formContainer'>
            {
              isLoginForm ?
              <LoginForm handleLinkClick={this.handleFormSwitch} handleLogin={this.handleLogin} errors={errors} /> :
              <SignupForm handleLinkClick={this.handleFormSwitch} handleSignup={this.handleSignup} errors={errors} />
            }
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(null, { loginUser, getFeed, signUpUser })(FormContainer);
