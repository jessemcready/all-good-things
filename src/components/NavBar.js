import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { signout } from '../actions/users'

class NavBar extends Component {
  state = { activeItem: 'feed' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    const activeItem = this.props.location.pathname.split('/')[1]
    activeItem === '' ? this.setState({ activeItem: 'feed' }) : this.setState({ activeItem })
  }

  render() {
    const { user: { name, admin } } = this.props
    const { activeItem } = this.state

    return (
        <Menu
          fixed='top'
          fluid
          size='massive'
          inverted
          compact
          style={{ backgroundColor: '#0245ee', padding: '0 17vw 0 17vw' }} >
          <Menu.Item header className='navBarItem' >All Good Things</Menu.Item>
          <Link to='/'>
            <Menu.Item
              name='feed'
              active={ activeItem === 'feed' }
              className='navBarItem'
              onClick={this.handleItemClick} />
          </Link>
          <Link to='/discover'>
            <Menu.Item
              name='discover'
              active={activeItem === 'discover'}
              className='navBarItem'
              onClick={this.handleItemClick} />
          </Link>
          {
            admin ?
            <Link to='/flagged'>
              <Menu.Item
                name='flagged'
                active={activeItem === 'flagged'}
                className='navBarItem'
                onClick={this.handleItemClick} />
            </Link> :
            null
          }
          <Menu.Menu position='right'>
            <Link to='/profile'>
              <Menu.Item
                icon='user circle'
                content={name}
                active={activeItem === 'profile'}
                className='navBarItem'
                onClick={this.handleItemClick} />
            </Link>
            <Menu.Item
              content='Log Out'
              position='right'
              className='navBarItem'
              onClick={() => this.props.signout()}
            />
          </Menu.Menu>
        </Menu>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default withRouter(connect(mapStateToProps, { signout } )(NavBar));
