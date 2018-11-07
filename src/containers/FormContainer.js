import React, { Component } from 'react';
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
    this.setState({
      isLoginForm: !this.state.isLoginForm,
      errors: ''
    })
  }

  handleLogin = (event, formData) => {
    const { loginOrSignup } = this.props
    FetchAdapter.loginUser(formData).then( user => {
      if(user.errors){
        this.setState({
          errors: user.errors
        })
      } else {
        localStorage.setItem('jwt', user.jwt)
        loginOrSignup(user)
      }
    })
  }

  handleSignup = (event, formData) => {
    const { loginOrSignup } = this.props
    FetchAdapter.signupUser(formData).then(user => {
      if(user.errors){
        this.setState({
          errors: user.errors
        })
      } else {
        loginOrSignup(user)
      }
    })
  }

  render() {
    const { errors, isLoginForm } = this.state
    return (
      <Grid container columns={3}>
        <Grid.Row centered stretched verticalAlign='middle' style={{ marginTop: '15%'}}>
          {
            isLoginForm ?
            <LoginForm handleLinkClick={this.handleFormSwitch} handleLogin={this.handleLogin} errors={errors} /> :
            <SignupForm handleLinkClick={this.handleFormSwitch} handleSignup={this.handleSignup} errors={errors} />
          }
        </Grid.Row>
      </Grid>
    );
  }

}

export default connect(null, { loginOrSignup })(FormContainer);
