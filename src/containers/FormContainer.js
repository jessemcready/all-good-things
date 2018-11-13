import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import LoginForm from '../components/form/LoginForm'
import SignupForm from '../components/form/SignupForm'
import { loginOrSignup } from '../actions/users'
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
    const { loginOrSignup } = this.props
    FetchAdapter.loginUser(formData).then( user => {
      if(user.message){
        this.setState({ errors: user.message })
      } else {
        localStorage.setItem('jwt', user.jwt)
        loginOrSignup(user)
      }
    })
  }

  handleSignup = (event, formData) => {
    const { loginOrSignup } = this.props
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
      FetchAdapter.signupUser(formData, data.secure_url).then(user => {
        if(user.errors){
          this.setState({ errors: user.errors })
        } else {
          localStorage.setItem('jwt', user.jwt)
          loginOrSignup(user)
        }
      })
    })
  }

  render() {
    const { errors, isLoginForm } = this.state
    document.getElementById("root").style.backgroundImage =
    "url('https://images.unsplash.com/photo-1491331606314-1d15535360fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4043f16f3326ded0982882ac7e4fe7a6&auto=format&fit=crop&w=1050&q=80')"
    document.getElementById("root").style.opacity = '0.8'
    return (
      <Fragment>
        <Grid container columns={3}>
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

export default connect(null, { loginOrSignup })(FormContainer);
