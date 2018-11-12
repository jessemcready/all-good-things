import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Card, Button, Grid } from 'semantic-ui-react'
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

  getPosts = () => {
    if( !this.following() ){
      const { posts } = this.props
      const { currentUser } = this.state
      return posts.filter(post => post.user.email === currentUser.email)
    }
    return this.state.currentUser.posts
  }

  render(){
    const { currentUser, signedInUser } = this.state
    const posts = this.getPosts()
    return(
      <Container style={{marginTop: '75px'}} textAlign='center' text fluid>
        {
          signedInUser ?
          <Redirect to='/profile' /> :
          <Fragment>
            <Grid container>
            <Grid.Column width={4} style={{position: 'absolute', left: '0'}}>
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
                    <Button basic color='teal' onClick={this.handleFollow}>
                      Follow
                    </Button> :
                    <Button basic color='red' onClick={this.handleUnfollow}>
                      Unfollow
                    </Button>
                  }
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9} style={{marginLeft:'10em'}}>
              { posts !== undefined ?
                posts.map( post => <Post key={post.id} {...post} profile={true} />) :
                null
               }
            </Grid.Column>
            <Grid.Column width={3} floated='right'></Grid.Column>
          </Grid>
          </Fragment>
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { followUser, unfollowUser })(Profile);
