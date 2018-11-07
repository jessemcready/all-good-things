import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Feed, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/users'
import { createPostComment } from '../../actions/posts'
import Moment from 'react-moment'
import CommentContainer from '../../containers/CommentContainer'
import FetchAdapter from '../../adapters/FetchAdapter'

class Post extends Component {
  state = {
    liked : false,
    clicked: false
  }

  componentDidMount(){
    const { id, users } = this.props
    const foundPost = users.likes.find( like => {
      return like.post_id === id
    })
    if(foundPost){
      this.setState({ liked: true })
    }
  }

  handleSubmit = (event, input) => {
    const { users, createPostComment, id, comments } = this.props
    const { userInput } = input
    const comment = { post_id: id, user_id: users.id, content: userInput }
    FetchAdapter.createComment(comment).then( commentObj => {
      this.setState({ comments: [commentObj, ...comments] })
      createPostComment({
        id: commentObj.id,
        post_id: commentObj.post.id,
        user: commentObj.user,
        content: commentObj.content
      })
    })
  }

  handleLike = () => {
    const { id, users, likePost } = this.props
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost({ id: likeObj.id, user_id: users.id, post_id: id })
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { id, unlikePost, users } = this.props
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, users.id)
      this.setState({ liked: false })
    })
  }

  handlePostPage = () => {
    this.setState({
      clicked: true
    })
  }

  render() {
    const { id, content, comments, created_at, user, likes, profile } = this.props
    const { liked, clicked } = this.state

    if( user.name === undefined && content === undefined){
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
              {user.name}
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
              <CommentContainer comments={comments.slice(0,2)} postId={id} handleSubmit={this.handleSubmit} profile={profile} />
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
    users: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { likePost, unlikePost, createPostComment })(Post);
