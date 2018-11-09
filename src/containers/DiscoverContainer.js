import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Search from '../components/discover/Search'
import UserList from '../components/discover/UserList'
import { connect } from 'react-redux'
import FetchAdapter from '../adapters/FetchAdapter'

class DiscoverContainer extends Component {
  state = {
    users: [],
    searchTerm: ''
  }

  componentDidMount(){
    const { user } = this.props
    FetchAdapter.getUsers().then( userObjs => {
      const users = userObjs.filter( userObj =>
        user.email !== userObj.email
      )
      this.setState({ users })
    })
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  usersToShow = () => {
    const { users, searchTerm } = this.state
    const lowercaseTerm = searchTerm.toLowerCase()
    return users.filter( user => {
      const lowercaseName = user.name.toLowerCase()
      const lowercaseEmail = user.email.toLowerCase()
      return (
        lowercaseName.includes(lowercaseTerm) ||
        lowercaseEmail.includes(lowercaseTerm)
      )
    })
  }

  render() {
    const { searchTerm } = this.state
    return (
      <Container style={{ marginTop: '75px' }} textAlign='center'>
        <Search handleChange={this.handleChange} value={searchTerm} />
        <UserList users={this.usersToShow()} />
      </Container>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps)(DiscoverContainer);
