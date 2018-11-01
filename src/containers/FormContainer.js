import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import LoginForm from '../components/form/LoginForm'
import SignupForm from '../components/form/SignupForm'
import { loginUrl, signupEditUrl } from '../constants/fetchUrls'
import { loginOrSignup } from '../actions/users'

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
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then( user => {
      if(user.errors){
        // handle errors
      } else {
        this.props.loginOrSignup(user)
      }
    })
  }

  handleSignup = (event, formData) => {
    fetch(signupEditUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: formData
      })
    }).then(res => res.json()).then(user => {
      if(user.errors){
        // handle errors
      } else {
        this.props.loginOrSignup(user)
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
