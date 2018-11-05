import React, { Component } from 'react';
import Post from '../components/posts/Post'
import { Container, Header, Icon, Modal, Form, TextArea, Button, Feed } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postsUrl } from '../constants/fetchUrls'
import { createPost } from '../actions/posts'

class FeedContainer extends Component{
  state = {
    userInput: '',
    modalOpen: false
  }

  handleChange = (event) => {
    if(this.state.userInput.length < 400){
      this.setState({
        userInput: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    const { user, createPost } = this.props
    const { userInput } = this.state
    fetch(postsUrl, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        post: {
          user_id: user.id,
          content: userInput
        }
      })
    }).then(res => res.json()).then( postObj => {
      this.setState({
        userInput: '',
        modalOpen: false
      })
      createPost(postObj)
    })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  orderPosts = posts => {
    return posts.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })
  }

  render() {
    const { posts, user } = this.props
    const { userInput } = this.state
    let combinedPosts = {}
    Object.assign(combinedPosts, posts)
    Object.assign(combinedPosts, user.posts)
    combinedPosts = this.orderPosts(posts)
    if(posts.length === 0){
      return (
        <Container textAlign='center' style={{marginTop: '75px'}}>
          <Header>
            No posts to display. Click Discover above and search for some users!
            Or try creating your first post by clicking on the '+' in the bottom right.
          </Header>
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            trigger={
              <Icon name='plus circle' size='huge' style={{position: 'fixed', bottom: '0', right: '0'}} onClick={this.handleOpen} />
            }>
            <Modal.Header>Create/Edit Post</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <TextArea
                placeholder='Put down some thoughts'
                onChange={this.handleChange}
                value={userInput}
                />
                <Button>Submit</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Container>
      )
    }

    return (
      <Feed size='large' textAlign='center' style={{marginTop: '75px'}}>
        {combinedPosts.map( post => <Post key={post.id} {...post} />)}
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={
            <Icon name='plus circle' size='huge' style={{position: 'fixed', bottom: '0', right: '0'}} onClick={this.handleOpen} />
          }>
          <Modal.Header>Create/Edit Post</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <TextArea
              placeholder='Put down some thoughts'
              onChange={this.handleChange}
              value={userInput}
              />
              <Button>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
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
