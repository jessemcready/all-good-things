import React, { Component } from 'react';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(App);
