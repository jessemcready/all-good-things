import React, { Component } from 'react';
import { connect } from 'react-redux'
import FetchAdapter from '../../adapters/FetchAdapter'
import { Container, Button, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { unreportPost, deletePost } from '../../actions/posts'

class FlaggedPosts extends Component {

  handleUnreport = id => {
    const { unreportPost } = this.props
    FetchAdapter.unreportPost(id).then( postObj => {
      unreportPost(id)
    })
  }

  render() {
    const { user, posts } = this.props
    const flaggedPosts = posts.filter( post => post.flagged)
    return !user.admin ?
    <Redirect to='/' /> :
    (
      <Container style={{marginTop: '75px'}}>
        {flaggedPosts.map( post => (
          <Message>
            <h3>{post.content}</h3>
            <Button basic color='blue' onClick={() => this.handleUnreport(post.id)}>
              Unreport
            </Button>
            <Button basic color='red' onClick={() => this.handleDelete(post.id)}>
              Delete Post
            </Button>
          </Message>
        ))}
      </Container>
    );
  }

}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, {
  unreportPost, deletePost
})(FlaggedPosts);
