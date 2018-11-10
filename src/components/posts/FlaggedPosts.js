import React, { Component } from 'react';
import { connect } from 'react-redux'
import FetchAdapter from '../../adapters/FetchAdapter'
import { Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class FlaggedPosts extends Component {

  render() {
    const { user, posts } = this.props
    const flaggedPosts = posts.filter( post => post.flagged)
    return !user.admin ?
    <Redirect to='/' /> :
    (
      <Container style={{marginTop: '75px'}}>
        {flaggedPosts.map( post => <h3>{post.content}</h3>)}
      </Container>
    );
  }

}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps)(FlaggedPosts);
