import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Card, Button, Confirm } from 'semantic-ui-react'
import { usersUrl, followUrl } from '../../constants/fetchUrls'
import { followUser, unfollowUser } from '../../actions/users'

class Profile extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount(){
    const id = this.props.match.params.id
    fetch(`${usersUrl}/${id}`)
    .then( res => res.json() )
    .then( currentUser => {
      this.setState( { currentUser } )
    })
  }

  handleFollow = () => {
    const { user, followUser } = this.props
    const { currentUser } = this.state
    fetch(followUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        relationship: {
          follower_id: user.id,
          followee_id: currentUser.id
        }
      })
    }).then(res => res.json()).then( relationshipObj => {
      followUser(currentUser)
      this.following()
    })
  }

  handleUnfollow = () => {

  }

  following = () => {
    const { user } = this.props
    const { currentUser, following } = this.state
    const foundUser = user.followers.find(follower => {
      return follower.email === currentUser.email
    })
    if(foundUser === undefined){
      return true
    }
    return false
  }

  render(){
    const { user } = this.props
    const { currentUser, following } = this.state
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
