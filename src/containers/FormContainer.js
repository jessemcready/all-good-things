import React, { Component, Fragment } from 'react';
import { Grid } from 'semantic-ui-react'
import LoginForm from '../components/form/LoginForm'
import SignupForm from '../components/form/SignupForm'

class FormContainer extends Component {
  state = { isLoginForm: true }

  handleFormSwitch = () => this.setState({ isLoginForm: !this.state.isLoginForm })

  render() {
    const { isLoginForm } = this.state
    return (
      <Fragment>
        <Grid container columns={3} className='formGrid'>
          <Grid.Row centered stretched verticalAlign='middle' className='formContainer'>
            {
              isLoginForm ?
              <LoginForm handleLinkClick={this.handleFormSwitch} /> :
              <SignupForm handleLinkClick={this.handleFormSwitch} />
            }
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default FormContainer;
