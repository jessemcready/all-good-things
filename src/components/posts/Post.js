import React from 'react';
import { Card } from 'semantic-ui-react'

const Post = ({username, content}) => {
  return (
    <Card centered raised>
      <p>{username} {content}</p>
    </Card>
  );
}

export default Post;
