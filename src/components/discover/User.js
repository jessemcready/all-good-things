import React, { Component } from 'react';
import { Card, Grid, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class User extends Component{
  handleClick = () => this.props.history.push({pathname: `/profile/${this.props.id}`})

  render() {
    const { id, name, email, profile_url } = this.props
    return(
      <Grid.Column>
        <Card centered onClick={this.handleClick} className='userCard'>
          <Card.Content>
            <Image circular src={profile_url} size='tiny' />
            <Card.Header>{name}</Card.Header>
            <Card.Description>
              <p>Email: { email }</p>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>

    )
  }
}

export default withRouter(User);
