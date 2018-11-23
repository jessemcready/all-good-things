import React, { Component } from 'react';
import { Card, Grid, Image } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class User extends Component{
  state = { clicked: false }

  handleClick = () => this.setState({ clicked: !this.state.clicked })

  render() {
    const { clicked } = this.state
    const { id, name, email, profile_url } = this.props
    return(
      <Grid.Column>
        {
          !clicked ?
          <Card centered onClick={this.handleClick} className='userCard'>
            <Card.Content>
              <Image circular src={profile_url} size='tiny' />
              <Card.Header>{name}</Card.Header>
              <Card.Description>
                <p>Email: { email }</p>
              </Card.Description>
            </Card.Content>
          </Card> :
          <Redirect to={`/profile/${id}`} />
        }

      </Grid.Column>

    )
  }
}

export default User;
