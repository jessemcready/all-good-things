import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import FormContainer from './containers/FormContainer'
import MainPage from './containers/MainPage'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'

class App extends Component {
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
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(App));
