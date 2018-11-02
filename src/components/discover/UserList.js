import React from 'react';
import { List } from 'semantic-ui-react'
import User from './User'

const UserList = ({ users }) => (
  <List>
    { users.map(user => <User key={user.id} {...user} /> ) }
  </List>
)

export default UserList;
