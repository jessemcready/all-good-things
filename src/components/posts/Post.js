import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Feed, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/users'
import Moment from 'react-moment'
import CommentContainer from '../../containers/CommentContainer'
import FetchAdapter from '../../adapters/FetchAdapter'

class Post extends Component {
  state = {
    liked : false,
    clicked: false
  }

  componentDidMount(){
    const { id, user } = this.props
    const foundPost = user.likes.find( like => {
      return like.post_id === id
    })
    if(foundPost){
      this.setState({ liked: true })
    }
  }

  handleLike = () => {
    const { id, user, likePost } = this.props
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost({ id: likeObj.id, user_id: user.id, post_id: id })
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { id, unlikePost, user } = this.props
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, user.id)
      this.setState({ liked: false })
    })
  }

  handlePostPage = () => {
    this.setState({
      clicked: true
    })
  }

  render() {
    const { id, username, content, comments, created_at, user } = this.props
    const { liked, clicked } = this.state

    if( username === undefined && content === undefined){
      return null
    }

    return (
      <Fragment>
      {
        clicked ?
        <Redirect to={`/posts/${id}`} /> :
        <Feed.Event>
          <Card centered raised>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
              {
                username === undefined ?
                user.name :
                username
              }
              </Feed.User>
              <Card.Meta>
                <Feed.Date>
                  <Moment fromNow ago>{created_at}</Moment> ago
                </Feed.Date>
              </Card.Meta>
            </Feed.Summary>
            <Feed.Extra text onClick={this.handlePostPage}>
              {content}
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
              {
                liked ?
                <Icon name='like' color='red' onClick={this.handleUnlike} /> :
                <Icon name='like' onClick={this.handleLike} />
              }
              </Feed.Like>
              <CommentContainer comments={comments.slice(0,2)} postId={id} addComment={false} />
            </Feed.Meta>
          </Feed.Content>
          </Card>
        </Feed.Event>
      }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { likePost, unlikePost })(Post);
