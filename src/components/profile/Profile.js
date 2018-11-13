import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container, Card, Button, Confirm, Grid, Image } from 'semantic-ui-react'
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
    const posts = this.getUserPosts()
    return (
      <Grid container columns={3}>
        <Grid.Column width={4} style={{position: 'absolute', left: '0'}}>
          <Card fluid>
            <Image src={user.profile_url} />
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Description>
                Email: {user.email}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group fluid>
                <Button inverted color='teal' onClick={this.handleEdit}>Edit Account</Button>
                <Button inverted color='red' onClick={this.handleDelete}>Delete Account</Button>
              </Button.Group>
              <Confirm
                open={open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={9} style={{marginLeft: '10em'}}>
          { posts.map( post => <Post key={post.id} {...post} profile={true} />) }
        </Grid.Column>
        <Grid.Column width={3} floated='right'></Grid.Column>
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

  cancelEdit = () => this.setState( { editing: false })

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
    if(value.profileUrl !== undefined){
      const cloudUrl = 'https://api.cloudinary.com/v1_1/jessemcready/image/upload'
      const upload_preset = 'wshmuzkt'
      const file = value.profileUrl
      const formInfo = new FormData()
      formInfo.append('file', file)
      formInfo.append('upload_preset', upload_preset)
      fetch(cloudUrl, {
          method: 'POST',
          body: formInfo
        }).then( res => res.json()).then( data => {
          updatedUser = {...updatedUser, profile_url: data.secure_url}
          FetchAdapter.updateUser(user.id, updatedUser, data.secure_url).then( updatedUserObj => {
            editUser(updatedUserObj)
            this.setState({ editing: false })
          })
        })
    } else {
      FetchAdapter.updateUser(user.id, updatedUser).then( updatedUserObj => {
        editUser(updatedUserObj)
        this.setState({ editing: false })
      })
    }
  }


  render(){
    const { user } = this.props
    const { editing } = this.state
    return(
      <Container className='underNav' text fluid>
        {
          !editing ?
          this.renderCard() :
          <Fragment>
            <SignupForm handleSignup={this.handleSubmit} user={user} errors='' />
            <Button onClick={this.cancelEdit}>Cancel</Button>
          </Fragment>
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { editUser, signout })(Profile);
