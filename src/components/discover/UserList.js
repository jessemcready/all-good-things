import React from 'react';
import { Grid } from 'semantic-ui-react'
import User from './User'

const UserList = ({ users }) => (
  <Grid columns={3} style={{margin: '10px'}} relaxed container text>
    { users.map(user => <User key={user.id} {...user} /> ) }
  </Grid>
)

export default UserList;
