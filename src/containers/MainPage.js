import React, { Component } from 'react';
import { connect } from 'react-redux'
import FeedContainer from './FeedContainer'
import Profile from '../components/profile/Profile'
import { Route, Switch, withRouter } from 'react-router-dom'

class MainPage extends Component {

  render() {
    return (
        <div>
          <Switch>
            <Route
              exact path='/'
              component={FeedContainer}
            />
            <Route
              exact path='/profile'
              component={Profile}
            />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps)(MainPage));
