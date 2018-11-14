import React, { Component } from 'react';
import Post from '../components/posts/Post'
import { Container, Header, Feed, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost } from '../actions/posts'
import NewPostModal from '../components/modals/NewPostModal'
import ChatContainer from './ChatContainer'

class FeedContainer extends Component{
  orderPosts = posts =>
    posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

  render() {
    const posts = this.orderPosts(this.props.posts)
    if(posts.length === 0){
      return (
        <Container textAlign='center' className='underNav'>
          <Header>
            No posts to display. Click Discover above and search for some users!
            Or try creating your first post by clicking on the '+' in the bottom right.
          </Header>
          <NewPostModal />
        </Container>
      )
    }

    return (
      <Grid>
        <Grid.Column width={3}>
          <ChatContainer />
        </Grid.Column>
        <Grid.Column width={10}>
          <Feed size='large' style={{marginTop: '75px', fontFamily:'Roboto'}}>
            {posts.map( post => <Post key={post.id} {...post} />)}
          </Feed>
        </Grid.Column>
        <Grid.Column width={3}>
          <NewPostModal />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ posts, users: { user } }) => ({ posts, user })

export default withRouter(connect(mapStateToProps, { createPost })(FeedContainer));
