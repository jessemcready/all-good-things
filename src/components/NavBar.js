import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { signout } from '../actions/users'

class NavBar extends Component {

  render() {
    return (
        <Menu fixed='top' fluid size='massive'>
          <Menu.Item header>All Good Things</Menu.Item>
          <Link to='/'>
            <Menu.Item name='feed' />
          </Link>
          <Link to='/profile'>
            <Menu.Item name='profile' />
          </Link>
          <Link to='/discover'>
            <Menu.Item name='discover' />
          </Link>
          <Menu.Item
            name='signOut'
            position='right'
            onClick={() => this.props.signout()}
          />
        </Menu>
    );
  }
}

export default connect(null, { signout } )(NavBar);
