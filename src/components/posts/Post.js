import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Feed, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/users'
import { createPostComment, deletePost } from '../../actions/posts'
import Moment from 'react-moment'
import CommentContainer from '../../containers/CommentContainer'
import FetchAdapter from '../../adapters/FetchAdapter'

class Post extends Component {
  state = {
    liked : false,
    clicked: false,
    usernameClick: false
  }

  componentDidMount(){
    const { id, users } = this.props
    const foundPost = users.likes.find( like =>
      like.post ? like.post.id === id : like.post_id === id
    )
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
      const { id, post, user, content } = commentObj
      createPostComment({ id, post_id: post.id, user, content })
    })
  }

  handleLike = () => {
    const { id, users, likePost } = this.props
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost(likeObj)
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { id, unlikePost, users } = this.props
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, users.id, users.email)
      this.setState({ liked: false })
    })
  }

  handlePostPage = () => this.setState({ clicked: true })

  handleUserClick = () => this.setState({ usernameClick: true })

  handleReport = () => {

  }

  render() {
    const { id, content, comments, created_at, user, likes, profile } = this.props
    const { liked, clicked, usernameClick } = this.state

    return user.name === undefined && content === undefined ?
    null :
    (
      <Fragment>
      {
        clicked ?
        <Redirect to={`/posts/${id}`} /> :
        <Feed.Event>
          <Card centered raised>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User onClick={this.handleUserClick}>
              {
                usernameClick ?
                <Redirect to={`/profile/${user.id}`} /> :
                user.name
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
              {
                likes ?
                likes.length :
                0
               } Likes
              </Feed.Like>
              <Icon name='warning' style={{position: 'absolute', right: '0'}} onClick={this.handleReport} />
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

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, users: user })

export default connect(mapStateToProps, { likePost, unlikePost, createPostComment })(Post);
