import React, { Component } from 'react';
import { connect } from 'react-redux'
import FeedContainer from './FeedContainer'
import DiscoverContainer from './DiscoverContainer'
import Profile from '../components/profile/Profile'
import UserProfile from '../components/profile/UserProfile'
import PostShow from '../components/posts/PostShow'
import FlaggedPosts from '../components/posts/FlaggedPosts'
import { Route, Switch, withRouter } from 'react-router-dom'

class MainPage extends Component {

  render() {
    document.getElementById("root").style.backgroundImage = 'none'
    document.getElementById("root").style.opacity = '1'
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
            <Route
              exact path='/flagged'
              component={FlaggedPosts}
            />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default withRouter(connect(mapStateToProps)(MainPage));
