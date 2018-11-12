import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { signout } from '../actions/users'

class NavBar extends Component {
  state = { activeItem: 'feed' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { user } = this.props
    const { activeItem } = this.state
    const styles = {
      color: '#FFFFFF',
      fontFamily: 'Roboto'
    }

    return (
        <Menu
          fixed='top'
          tabular
          fluid
          size='massive'
          inverted
          secondary
          style={{backgroundColor: '#0245ee', opacity: '0.8'}}>
          <Menu.Item header style={styles} >All Good Things</Menu.Item>
          <Link to='/'>
            <Menu.Item
              name='feed'
              active={ activeItem === 'feed' }
              style={styles}
              onClick={this.handleItemClick} />
          </Link>
          <Link to='/profile'>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              style={styles}
              onClick={this.handleItemClick} />
          </Link>
          <Link to='/discover'>
            <Menu.Item
              name='discover'
              active={activeItem === 'discover'}
              style={styles}
              onClick={this.handleItemClick} />
          </Link>
          {
            user.admin ?
            <Link to='/flagged'>
              <Menu.Item
                name='flagged'
                active={activeItem === 'flagged'}
                style={styles}
                onClick={this.handleItemClick} />
            </Link> :
            null
          }
          <Menu.Item
            name='signOut'
            position='right'
            style={styles}
            onClick={() => this.props.signout()}
          />
        </Menu>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps, { signout } )(NavBar);
