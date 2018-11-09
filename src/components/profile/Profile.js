import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Card, Button, Confirm, Grid } from 'semantic-ui-react'
import SignupForm from '../form/SignupForm'
import { editUser, signout } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'
import Post from '../posts/Post'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      name: props.user.name,
      email: props.user.email,
      password: '',
      result: '',
      open: false
    }
  }

  orderPosts = () => (
    this.getUserPosts().sort((a,b) =>
      new Date(b.created_at) - new Date(a.created_at)
    )
  )

  getUserPosts = () => {
    const { posts, user } = this.props
    return posts.filter( post => post.user.email === user.email )
  }

  renderCard = () => {
    const { user } = this.props
    const { open } = this.state
    const posts = this.orderPosts()
    return (
      <Grid container columns={2}>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Description>
                Email: {user.email}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='green' onClick={this.handleEdit}>Edit</Button>
              <Button basic color='red' onClick={this.handleDelete}>Delete</Button>
              <Confirm
                open={open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          { posts.map( post => <Post key={post.id} {...post} profile={true} />) }
        </Grid.Column>
      </Grid>
    )
  }

  handleConfirm = () => {
    const { user, signout } = this.props
    FetchAdapter.deleteUser(user.id).then( deletedObj => { signout() } )
  }

  handleCancel = () => this.setState({ result: 'cancelled', open: false })

  handleEdit = () => this.setState({ editing: !this.state.editing })

  handleDelete = () => this.setState({ open: true })

  handleSubmit = (event, value) => {
    const { user, editUser } = this.props
    let updatedUser
    if(value.password === ''){
      const { name, email } = value
      updatedUser = { name, email }
    } else {
      const { name, email, password } = value
      updatedUser = { name, email, password }
    }
    FetchAdapter.updateUser(user.id, updatedUser).then( updatedUserObj => {
      editUser(updatedUserObj)
      this.setState({ editing: false })
    })
  }


  render(){
    const { user } = this.props
    const { editing } = this.state
    return(
      <Container style={{marginTop: '75px'}} textAlign='center' text>
        <Header size='huge'>{user.name}'s Profile</Header>
        {
          !editing ?
          this.renderCard() :
          <SignupForm handleSignup={this.handleSubmit} user={user} errors='' />
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { editUser, signout })(Profile);
