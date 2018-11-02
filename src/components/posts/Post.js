import React from 'react';
import { Card, Button } from 'semantic-ui-react'

const Post = ({username, content}) => {
  return (
    <Card centered raised>
      <Card.Header>{ username }</Card.Header>
      <Card.Content>{ content }</Card.Content>
      <Card.Content extra>
        <Button>Like</Button>
      </Card.Content>
    </Card>
  );
}

export default Post;
