import React from 'react';
import { Comment, Header, Input } from 'semantic-ui-react'
import PostComment from '../components/posts/PostComment'

const CommentContainer = ({comments}) => (
  <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
    <Input placeholder="Comment" fluid />
    { comments.map( comment => <PostComment key={comment.id} {...comment} />) }
  </Comment.Group>
);

export default CommentContainer;
