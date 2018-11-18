import React, { Component } from 'react';
import { List, Image, Segment, Header, Popup } from 'semantic-ui-react'
import ChatBox from './ChatBox'

class FriendsList extends Component {

  render() {
    const { user: { followers }, onUserSelect, socket } = this.props
    debugger
    return (
      <Segment className='robotoFam'>
        <Header>Friends</Header>
        <List divided>
          {followers.map( follower => (
            <List.Item>
              <Image avatar src={follower.profile_url} />
              <List.Content>
                <Popup
                  trigger={
                    <List.Header as='a' onClick={() => onUserSelect(follower)}>{follower.name}</List.Header>
                  }
                  content={<ChatBox user={follower} socket={socket} />}
                  hideOnScroll
                  on='click'
                  position='right center'
                  />
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }

}

export default FriendsList;
