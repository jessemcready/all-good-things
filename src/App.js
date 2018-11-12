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
    const { user } = this.props
    return (
      <Container fluid>
          {
            user.email === '' ?
            <FormContainer /> :
            <div>
              <NavBar style={{color:'#FFFFFF', fontFamily:'Roboto'}} />
              <MainPage />
            </div>
          }
      </Container>
    );
  }
}

const mapStateToProps = ({ users: { user } }) => ({ user })

export default withRouter(connect(mapStateToProps, { loginOrSignup })(App));
