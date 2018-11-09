import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Header, Card, Button, Grid } from 'semantic-ui-react'
import { followUser, unfollowUser } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'
import Post from '../posts/Post'

class Profile extends Component {
  state = {
    currentUser: {},
    signedInUser: false
  }

  componentDidMount(){
    const id = this.props.match.params.id

    id === 'undefined' ? this.setState({ signedInUser: true }) :
    FetchAdapter.getUser(id).then( currentUser => {
      this.setState( { currentUser: currentUser.user } )
    })
  }

  handleFollow = () => {
    const { user, followUser } = this.props
    const { currentUser } = this.state
    const relationship = { follower_id: user.id, followee_id: currentUser.id }
    FetchAdapter.followUser(relationship).then( relationshipObj => {
      followUser(currentUser)
    })
  }

  handleUnfollow = () => {
    const { user, unfollowUser } = this.props
    const { currentUser } = this.state
    const relationship = { follower_id: user.id, followee_id: currentUser.id }
    FetchAdapter.unfollowUser(relationship).then( relationshipObj => {
      unfollowUser(currentUser.email)
    })
  }

  following = () => {
    const { user } = this.props
    const { currentUser } = this.state
    const foundUser = user.followers.find(follower =>
      follower.email === currentUser.email
    )
    return foundUser === undefined ? true : false
  }

  usersPosts = () => {
    const { posts } = this.props
    const { email } = this.state.currentUser
    return posts.filter( post => post.user.email === email )
  }

  render(){
    const { currentUser, signedInUser } = this.state
    const posts = this.usersPosts()
    return(
      <Container style={{marginTop: '75px'}} textAlign='center' text>
        {
          signedInUser ?
          <Redirect to='/profile' /> :
          <Fragment>
            <Header size='huge'>{currentUser.name}'s Profile</Header>
            <Grid container columns={2}>
            <Grid.Column>
              <Card fluid>
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
            </Grid.Column>
            <Grid.Column>
              { posts !== undefined ?
                posts.map( post => <Post key={post.id} {...post} profile={true} />) :
                null
               }
            </Grid.Column>
          </Grid>
          </Fragment>
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { followUser, unfollowUser })(Profile);
