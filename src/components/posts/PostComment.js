import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostComment extends Component {
  render() {
    const { content, name } = this.props

    return content === '' ?
    null :
    (
      <Comment>
        <Comment.Content>
          <Comment.Author>{name}</Comment.Author>
          <Comment.Text>{content}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}

export default PostComment;
