import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostComment extends Component {
  state = { user: {} }

  componentDidMount(){
    FetchAdapter.getUser(this.props.user_id).then(user => this.setState({user: user.user}))
  }

  render() {
    const { content } = this.props
    const { user } = this.state
    return content === '' ?
    null :
    (
      <Comment>
        <Comment.Content>
          <Comment.Author>{user.name}</Comment.Author>
          <Comment.Text>{content}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}

export default PostComment;
