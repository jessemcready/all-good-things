import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Card, Button } from 'semantic-ui-react'
import SignupForm from '../form/SignupForm'
import { signupEditUrl } from '../../constants/fetchUrls'
import { editUser } from '../../actions/users'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      name: props.user.name,
      email: props.user.email,
      password: ''
    }
  }

  renderCard = () => {
    const { user } = this.props
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
          <Button basic color='red'>Delete</Button>
        </Card.Content>
      </Card>
    )
  }

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
    fetch(`${signupEditUrl}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: updatedUser})
    }).then(res => res.json()).then( updatedUserObj => {
      this.props.editUser(updatedUserObj)
      this.setState({
        editing: false
      })
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

export default connect(mapStateToProps, { editUser })(Profile);
