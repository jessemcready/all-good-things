import React, { Component } from 'react';
import Post from '../components/posts/Post'
import { Container, Header, Feed, Grid, Rail, Sticky } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost, getFeed } from '../actions/posts'
import NewPostModal from '../components/modals/NewPostModal'
import ChatContainer from './ChatContainer'

class FeedContainer extends Component{
  state = {}

  handleRef = contextRef => this.setState({ contextRef })

  orderPosts = posts => posts.sort((a,b) => new Date(b.post.created_at) - new Date(a.post.created_at))

  componentDidMount() {
    this.props.getFeed()
  }

  render() {
    const posts = this.orderPosts(this.props.posts)
    const { contextRef } = this.state

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
      <Grid centered columns={3}>
        <Grid.Column>
          <div ref={this.handleRef}>
              <Feed size='large' style={{marginTop: '75px', fontFamily:'Roboto'}}>
                {posts.map(post => (<Post key={post.post.id} post={post.post} user={post.user} profile={false}/> ))}
              </Feed>
              <Rail attached position='left'>
                <Sticky context={contextRef} offset={150}>
                  <ChatContainer />
                </Sticky>
              </Rail>
              <Rail attached position='right'>
                <Sticky context={contextRef} offset={200}>
                  <NewPostModal />
                </Sticky>
              </Rail>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ posts, users: { user } }) => ({ posts, user })

export default withRouter(connect(mapStateToProps, { createPost, getFeed })(FeedContainer));
