import React, { Component } from 'react';
import { connect } from 'react-redux'
import FetchAdapter from '../../adapters/FetchAdapter'
import { Container, Button, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { unreportPost, deletePost } from '../../actions/posts'

class FlaggedPosts extends Component {

  handleUnreport = id => FetchAdapter.unreportPost(id).then( postObj => this.props.unreportPost(id) )

  handleDelete = id => FetchAdapter.deletePost(id).then( deletedObj => this.props.deletePost(id) )

  render() {
    const { user, posts } = this.props
    const flaggedPosts = posts.filter( post => post.post.flagged)
    return !user.admin ?
    <Redirect to='/' /> :
    (
      <Container className='underNav'>
        {flaggedPosts.map( post => (
          <Message>
            <h3>{post.post.content}</h3>
            <Button basic color='blue' onClick={() => this.handleUnreport(post.post.id)}>
              Unreport
            </Button>
            <Button basic color='red' onClick={() => this.handleDelete(post.post.id)}>
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
