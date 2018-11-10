import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { signout } from '../actions/users'

class NavBar extends Component {

  render() {
    const { user: { admin } } = this.props
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
          {
            admin ?
            <Link to='/flagged'>
              <Menu.Item name='flagged' />
            </Link> :
            null
          }
          <Menu.Item
            name='signOut'
            position='right'
            onClick={() => this.props.signout()}
          />
        </Menu>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps, { signout } )(NavBar);
