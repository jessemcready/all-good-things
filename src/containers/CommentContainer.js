import React, { Component } from 'react';
import { Comment, Header, Form } from 'semantic-ui-react'
import PostComment from '../components/posts/PostComment'
import { connect } from 'react-redux'
import { createPostComment } from '../actions/posts'

class CommentContainer extends Component {
  state = {
    userInput: ''
  }

  handleChange = event =>{
    this.setState({ userInput: event.target.value })
  }

  handleComment = (event, input) => {
    const { handleSubmit } = this.props
    this.setState({ userInput: '' })
    handleSubmit(event, input)
  }

  render() {
    const { comments, addComment } = this.props
    const { userInput } = this.state
    return(
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        {
          addComment ?
          <Form onSubmit={event => this.handleComment(event, this.state)}>
            <Form.Input placeholder="Comment" fluid onChange={this.handleChange} value={userInput} />
          </Form> :
          null
        }
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
