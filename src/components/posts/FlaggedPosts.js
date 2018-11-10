import React, { Component } from 'react';
import { connect } from 'react-redux'
import FetchAdapter from '../../adapters/FetchAdapter'

class FlaggedPosts extends Component {

  render() {
    return (
      <div></div>
    );
  }

}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps)(FlaggedPosts);
