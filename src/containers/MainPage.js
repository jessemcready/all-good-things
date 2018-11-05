import React, { Component } from 'react';
import { connect } from 'react-redux'
import FeedContainer from './FeedContainer'
import DiscoverContainer from './DiscoverContainer'
import Profile from '../components/profile/Profile'
import UserProfile from '../components/profile/UserProfile'
import PostShow from '../components/posts/PostShow'
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
            <Route
              exact path='/profile/:id'
              component={UserProfile}
            />
            <Route
              exact path='/posts/:id'
              component={PostShow}
            />
            <Route
              exact path='/discover'
              component={DiscoverContainer}
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
