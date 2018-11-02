import React, { Component } from 'react';
import Post from '../components/posts/Post'
import { Container, Header, Icon, Modal, Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class FeedContainer extends Component{
  state = {
    userInput: ''
  }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  render() {
    const { posts, user } = this.props
    const { userInput } = this.state
    if(posts.length === 0){
      return (
        <Container textAlign='center' style={{marginTop: '75px'}}>
          <Header>
            No posts to display. Click Discover above and search for some users!
            Or try creating your first post by clicking on the '+' in the bottom right.
          </Header>
          <Modal
            trigger={
              <Icon name='plus circle' size='massive' style={{position: 'fixed', bottom: '0', right: '0'}}/>
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
      <Container textAlign='center' style={{marginTop: '75px'}}>
        {posts.map( post => <Post key={post.id} {...post} />)}
        {user.posts.map( post => <Post key={post.id} {...post} />)}
      <Icon
        name='plus circle'
        size='massive'
        style={{position: 'fixed', bottom: '0', right: '0'}}
      />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    user: state.users
  }
}

export default withRouter(connect(mapStateToProps)(FeedContainer));
