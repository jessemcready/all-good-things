import React from 'react';
import { Comment, Header } from 'semantic-ui-react'
import PostComment from '../components/posts/PostComment'

const CommentContainer = ({comments}) => (
  <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
    { comments.map( comment => <PostComment key={comment.id} {...comment} />) }
  </Comment.Group>
);

export default CommentContainer;
