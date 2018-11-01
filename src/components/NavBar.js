import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
          <Menu.Item name='discover' />
          <Menu.Item name='signOut' position='right' />
        </Menu>
    );
  }
}

export default NavBar;
