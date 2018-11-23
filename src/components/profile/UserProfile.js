import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Button, Grid, Image, Feed, Rail, Sticky } from 'semantic-ui-react'
import { followUser, unfollowUser } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'
import Post from '../posts/Post'

class Profile extends Component {
  state = { currentUser: {}, signedInUser: false }

  componentDidMount(){
    const id = this.props.match.params.id
    const { user } = this.props

    id === 'undefined' || parseInt(id) === user.id ? this.setState({ signedInUser: true }) :
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
    FetchAdapter.unfollowUser(relationship).then( relationshipObj => unfollowUser(currentUser.email))
  }

  following = () => {
    const { user } = this.props
    const { currentUser } = this.state
    const foundUser = user.followers.find( follower => follower.email === currentUser.email )
    return !!foundUser ? true : false
  }

  getPosts = () => {
    if( !this.following() ){
      const { posts } = this.props
      const { currentUser } = this.state
      return posts.filter(post => (
        !!post.post ? post.post.user_id === currentUser.id : post.user_id === currentUser.id
      ))
    }
    return this.state.currentUser.posts
  }

  handleRef = contextRef => this.setState({ contextRef })

  render(){
    const { currentUser, signedInUser, contextRef } = this.state
    const posts = this.getPosts()

    return(
      <Grid centered columns={3} className='underNav'>
        {
          signedInUser ?
          <Redirect to='/profile' /> :
          <Fragment>
              <Grid.Column>
                { posts !== undefined ?
                  <div ref={this.handleRef}>
                    <Feed size='large' style={{marginTop: '75px', fontFamily:'Roboto'}}>
                      {posts.map( post => <Post key={post.id} post={post.post} user={currentUser} profile={true} />)}
                    </Feed>
                    <Rail position='left' attached>
                      <Sticky context={contextRef} style={{marginTop: '90px'}}>
                      <Card fluid>
                        <Image src={currentUser.profile_url} />
                        <Card.Content>
                          <Card.Header>{currentUser.name}</Card.Header>
                          <Card.Description>
                            Email: {currentUser.email}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          {
                            this.following() ?
                            <Button inverted color='teal' onClick={this.handleFollow}>
                              Follow
                            </Button> :
                            <Button inverted color='red' onClick={this.handleUnfollow}>
                              Unfollow
                            </Button>
                          }
                        </Card.Content>
                      </Card>
                      </Sticky>
                    </Rail>
                  </div>
                   :
                  null
                 }
              </Grid.Column>
          </Fragment>
        }
      </Grid>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { followUser, unfollowUser })(Profile);
