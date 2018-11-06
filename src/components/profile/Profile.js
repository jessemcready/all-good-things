import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Card, Button, Confirm } from 'semantic-ui-react'
import SignupForm from '../form/SignupForm'
import { editUser, signout } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

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

  renderCard = () => {
    const { user } = this.props
    const { open } = this.state
    return (
      <Card centered>
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
    )
  }

  handleConfirm = () => {
    const { user, signout } = this.props
    FetchAdapter.deleteUser(user.id).then( deletedObj => {
      signout()
    })
  }

  handleCancel = () => this.setState({ result: 'cancelled', open: false })

  handleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleSubmit = (event, value) => {
    const { user } = this.props
    let updatedUser
    if(value.password === ''){
      updatedUser = {
        name: value.name,
        email: value.email
      }
    } else {
      updatedUser = {
        name: value.name,
        email: value.email,
        password: value.password
      }
    }
    FetchAdapter.updateUser(user.id, updatedUser).then( updatedUserObj => {
      this.props.editUser(updatedUserObj)
      this.setState({
        editing: false
      })
    })
  }

  handleDelete = () => {
    this.setState({
      open: true
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
          <SignupForm handleSignup={this.handleSubmit} user={user} />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps, { editUser, signout })(Profile);
