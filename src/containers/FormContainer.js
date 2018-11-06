import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import LoginForm from '../components/form/LoginForm'
import SignupForm from '../components/form/SignupForm'
import { loginUrl, usersUrl } from '../constants/fetchUrls'
import { loginOrSignup } from '../actions/users'
import FetchAdapter from '../adapters/FetchAdapter'

class FormContainer extends Component {
  state = {
    isLoginForm: true
  }

  handleFormSwitch = () => {
    this.setState({
      isLoginForm: !this.state.isLoginForm
    })
  }

  handleLogin = (event, formData) => {
    const { loginOrSignup } = this.props
    FetchAdapter.loginUser(formData).then( user => {
      if(user.errors){
        // handle errors
      } else {
        loginOrSignup(user)
      }
    })
  }

  handleSignup = (event, formData) => {
    const { loginOrSignup } = this.props
    FetchAdapter.signupUser(formData).then(user => {
      if(user.errors){
        // handle errors
      } else {
        loginOrSignup(user)
      }
    })
  }

  render() {
    return (
      <Grid container columns={3}>
        <Grid.Row centered stretched verticalAlign='middle' style={{ marginTop: '15%'}}>
          {
            this.state.isLoginForm ?
            <LoginForm handleLinkClick={this.handleFormSwitch} handleLogin={this.handleLogin} /> :
            <SignupForm handleLinkClick={this.handleFormSwitch} handleSignup={this.handleSignup} />
          }
        </Grid.Row>
      </Grid>
    );
  }

}

export default connect(null, { loginOrSignup })(FormContainer);
