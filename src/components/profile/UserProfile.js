import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Card, Button } from 'semantic-ui-react'
import { usersUrl, followUrl } from '../../constants/fetchUrls'
import { followUser, unfollowUser } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

class Profile extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount(){
    const id = this.props.match.params.id
    FetchAdapter.getUser(id).then( currentUser => {
      this.setState( { currentUser } )
    })
  }

  handleFollow = () => {
    const { user, followUser } = this.props
    const { currentUser } = this.state
    const relationship = { follower_id: user.id, followee_id: currentUser.id }
    FetchAdapter.followUser(relationship).then( relationshipObj => {
      followUser(currentUser)
      this.following()
    })
  }

  handleUnfollow = () => {
    const { user, unfollowUser } = this.props
    const { currentUser } = this.state
    const relationship = { follower_id: user.id, followee_id: currentUser.id }
    FetchAdapter.unfollowUser(relationship).then( relationshipObj => {
      unfollowUser(currentUser.id)
      this.following()
    })
  }

  following = () => {
    const { user } = this.props
    const { currentUser } = this.state
    const foundUser = user.followers.find(follower => {
      return follower.email === currentUser.email
    })
    if(foundUser === undefined){
      return true
    }
    return false
  }

  render(){
    const { currentUser } = this.state
    return(
      <Container style={{marginTop: '75px'}} textAlign='center' text>
        <Header size='huge'>{currentUser.name}'s Profile</Header>
        <Card centered>
          <Card.Content>
            <Card.Header>{currentUser.name}</Card.Header>
            <Card.Description>
              Email: {currentUser.email}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {
              this.following() ?
              <Button basic color='blue' onClick={this.handleFollow}>
                Follow
              </Button> :
              <Button basic color='red' onClick={this.handleUnfollow}>
                Unfollow
              </Button>
            }
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps, { followUser, unfollowUser })(Profile);
