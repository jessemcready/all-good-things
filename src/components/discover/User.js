import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class User extends Component{
  state = {
    clicked: false
  }

  handleClick = () => this.setState({ clicked: !this.state.clicked })

  render() {
    const { clicked } = this.state
    const { id, name, email } = this.props
    return(
      <Fragment>
        {
          !clicked ?
          <Card centered onClick={this.handleClick}>
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>
                <p>Name: { name }</p>
                <p>Email: { email }</p>
              </Card.Description>
            </Card.Content>
          </Card> :
          <Redirect to={`/profile/${id}`} />
        }

      </Fragment>

    )
  }
}

export default User;
