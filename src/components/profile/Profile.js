import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

const Profile = ({user}) => (
  <Container style={{marginTop: '75px'}} centered>
    <p>{user.name}</p>
  </Container>
);

const mapStateToProps = state => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(Profile);
