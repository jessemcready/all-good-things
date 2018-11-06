import React, { Component } from 'react';
import { Comment, Header, Form } from 'semantic-ui-react'
import PostComment from '../components/posts/PostComment'
import { connect } from 'react-redux'
import { commentsUrl } from '../constants/fetchUrls'
import { createPostComment } from '../actions/posts'

class CommentContainer extends Component {
  state = {
    userInput: ''
  }

  handleChange = event =>{
    this.setState({ userInput: event.target.value })
  }

  handleSubmit = (event, input) => {
    const { user, postId } = this.props
    const { userInput } = input
    fetch(commentsUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        comment: {
          post_id: postId,
          user_id: user.id,
          content: userInput
        }
      })
    }).then(res => res.json()).then( commentObj => {
      this.setState({ userInput : '' })
      createPostComment({
        id: commentObj.id,
        post_id: commentObj.post.id,
        user: commentObj.user,
        content: commentObj.content
      })
    })
  }

  render() {
    const {comments} = this.props
    const { userInput } = this.state
    return(
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        <Form onSubmit={event => this.handleSubmit(event, this.state)}>
          <Form.Input placeholder="Comment" fluid onChange={this.handleChange} value={userInput} />
        </Form>
        { comments.map( comment => <PostComment key={comment.id} {...comment} />) }
      </Comment.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { createPostComment })(CommentContainer);
