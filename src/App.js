import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import FormContainer from './containers/FormContainer'
import MainPage from './containers/MainPage'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'
import FetchAdapter from './adapters/FetchAdapter'
import { loginOrSignup } from './actions/users'
import { getFeed } from './actions/posts'
import './App.css'

class App extends Component {
  componentDidMount() {
    const { loginOrSignup, getFeed } = this.props
    if(localStorage.jwt){
      FetchAdapter.getCurrentUser().then( user => {
        loginOrSignup(user)
        getFeed()
      })
    }
  }

  render() {
    const { user } = this.props
    return (
      <Container fluid>
          {
            user.email === '' ?
            <Fragment>
              <div className='backgroundPortion'></div>
              <FormContainer />
            </Fragment> :
            <div>
              <NavBar />
              <MainPage />
            </div>
          }
      </Container>
    );
  }
}

const mapStateToProps = ({ users: { user } }) => ({ user })

export default withRouter(connect(mapStateToProps, { loginOrSignup, getFeed })(App));
