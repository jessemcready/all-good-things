import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container, Card, Button, Confirm, Grid, Image, Message, Rail, Sticky, Feed } from 'semantic-ui-react'
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
      open: false,
      errors: ''
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

  handleRef = contextRef => this.setState({ contextRef })

  renderCard = () => {
    const { user } = this.props
    const { open, contextRef } = this.state
    const posts = this.getUserPosts()
    return (
        <Grid.Column>
          <div ref={this.handleRef}>
            <Feed size='large' style={{marginTop: '75px', fontFamily:'Roboto'}}>
              { posts.map( post => <Post key={post.id} {...post} profile={true} />) }
            </Feed>
            <Rail attached position='left'>
              <Sticky context={contextRef} style={{marginTop: '90px'}}>
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
              </Sticky>
            </Rail>
          </div>
        </Grid.Column>
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
            if( updatedUserObj.errors ){
              this.setState({ errors: updatedUserObj.errors[0] })
            } else {
              editUser(updatedUserObj)
              this.setState({ editing: false, errors: '' })
            }
          })
        })
    } else {
      FetchAdapter.updateUser(user.id, updatedUser).then( updatedUserObj => {
        if( updatedUserObj.errors ){
          this.setState({ errors: updatedUserObj.errors[0] })
        } else {
          editUser(updatedUserObj)
          this.setState({ editing: false, errors: '' })
        }
      })
    }
  }


  render(){
    const { user } = this.props
    const { editing, errors } = this.state
    return(
      <Grid centered columns={3}>
        {
          !editing ?
          this.renderCard() :
          <Grid.Column>
            <SignupForm handleSignup={this.handleSubmit} user={user} errors='' />
            <Button onClick={this.cancelEdit}>Cancel</Button>
            {
              errors !== '' ?
              <Message error header='User update failed' content={errors} className='robotoFam' /> :
              null
            }
          </Grid.Column>
        }
      </Grid>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, { editUser, signout })(Profile);
