import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { signout } from '../actions/users'

class NavBar extends Component {

  render() {
    const { user: { admin } } = this.props
    const styles = {
      color: '#FFFFFF',
      fontFamily: 'Roboto'
    }

    return (
        <Menu fixed='top' fluid size='massive'
        style={{backgroundColor: '#0245ee', opacity: '0.8'}}>
          <Menu.Item header style={styles} >All Good Things</Menu.Item>
          <Link to='/'>
            <Menu.Item name='feed' style={styles} />
          </Link>
          <Link to='/profile'>
            <Menu.Item name='profile' style={styles}  />
          </Link>
          <Link to='/discover'>
            <Menu.Item name='discover' style={styles}  />
          </Link>
          {
            admin ?
            <Link to='/flagged'>
              <Menu.Item name='flagged' style={styles}  />
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
