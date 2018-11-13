import React, { Component } from 'react';
import { List, Image, Segment, Header } from 'semantic-ui-react'

class FriendsList extends Component {

  render() {
    const { user: { followers }, onUserSelect } = this.props
    return (
      <Segment style={{fontFamily: 'Roboto'}}>
        <Header>Friends</Header>
        <List divided>
          {followers.map( follower => (
            <List.Item>
              <Image avatar src={follower.profile_url} />
              <List.Content>
                <List.Header as='a' onClick={() => onUserSelect(follower)}>{follower.name}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }

}

export default FriendsList;
