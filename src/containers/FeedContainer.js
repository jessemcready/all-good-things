import React, { Component } from 'react';
import Post from '../components/posts/Post'
import { Container, Header, Icon, Modal, Form, TextArea, Button, Feed } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost } from '../actions/posts'
import FetchAdapter from '../adapters/FetchAdapter'
import NewPostModal from '../components/modals/NewPostModal'

class FeedContainer extends Component{

  orderPosts = posts => {
    return posts.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })
  }

  render() {
    const { posts, user } = this.props
    let combinedPosts = {}
    Object.assign(combinedPosts, posts)
    Object.assign(combinedPosts, user.posts)
    combinedPosts = this.orderPosts(posts)
    debugger
    if(posts.length === 0){
      return (
        <Container textAlign='center' style={{marginTop: '75px'}}>
          <Header>
            No posts to display. Click Discover above and search for some users!
            Or try creating your first post by clicking on the '+' in the bottom right.
          </Header>
          <NewPostModal />
        </Container>
      )
    }

    return (
      <Feed size='large' textAlign='center' style={{marginTop: '75px'}}>
        {combinedPosts.map( post => <Post key={post.id} {...post} />)}
        <NewPostModal />
      </Feed>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    user: state.users
  }
}

export default withRouter(connect(mapStateToProps, { createPost })(FeedContainer));
