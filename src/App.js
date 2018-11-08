import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import FormContainer from './containers/FormContainer'
import MainPage from './containers/MainPage'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'
import FetchAdapter from './adapters/FetchAdapter'
import { loginOrSignup } from './actions/users'

class App extends Component {
  componentDidMount() {
    const { loginOrSignup } = this.props
    if(localStorage.jwt){
      FetchAdapter.getCurrentUser().then( user => {
        loginOrSignup(user)
      })
    }
  }

  render() {
    const { users } = this.props
    return (
      <Container fluid>
          {
            users.email === '' ?
            <FormContainer /> :
            <div>
              <NavBar />
              <MainPage />
            </div>
          }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.user
  }
}

export default withRouter(connect(mapStateToProps, { loginOrSignup })(App));
