import React from 'react';
import Post from '../components/posts/Post'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const FeedContainer = ({posts}) => {
  if(posts.length === 0){
    return null
  }

  return (
    <Container textAlign='center' style={{marginTop: '75px'}}>
      {posts.map( post => <Post key={post.id} {...post} />)}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps)(FeedContainer));
