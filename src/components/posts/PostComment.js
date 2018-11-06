import React from 'react';
import { Comment } from 'semantic-ui-react'

const PostComment = ({ id, user, content }) => {
  if( content === ''){
    return null
  }
  
  return(
    <Comment>
      <Comment.Content>
        <Comment.Author>{user.name}</Comment.Author>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default PostComment;
