import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Feed, Card, Icon } from 'semantic-ui-react'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'
import { createPostComment } from '../../actions/posts'
import { likePost, unlikePost } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostShow extends Component {
  state = {
    post: {},
    comments: [],
    liked: false
  }

  componentDidMount(){
    const { id } = this.props.match.params
    const { user } = this.props
    const foundPost = user.likes.find( like => {
      return like.post_id === parseInt(id)
    })
    if(foundPost){
      this.setState({ liked: true })
    }
    FetchAdapter.getPost(id).then( post => {
      this.setState({ post, comments: post.comments })
    })
  }

  handleSubmit = (event, input) => {
    const { user, createPostComment } = this.props
    const { comments, post } = this.state
    const { userInput } = input
    const comment = { post_id: post.id, user_id: user.id, content: userInput }
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
    const { user, likePost } = this.props
    const { id } = this.props.match.params
    const like = { user_id: user.id, post_id: parseInt(id) }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost({ id: likeObj.id, user_id: user.id, post_id: parseInt(id) })
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { unlikePost, user } = this.props
    const { id } = this.props.match.params
    const like = { user_id: user.id, post_id: parseInt(id) }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(parseInt(id), user.id)
      this.setState({ liked: false })
    })
  }

  render() {
    const { liked, post : { user, created_at, content, likes } } = this.state
    const { comments } = this.state
    const { id } = this.props.match.params

    if(user === undefined){
      return null
    }
    return (
      <Feed.Event style={{marginTop: '75px'}}>
        <Card centered raised onClick={this.handlePostPage}>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{ user.name }</Feed.User>
            <Card.Meta>
              <Feed.Date>
                <Moment fromNow ago>{created_at}</Moment> ago
              </Feed.Date>
            </Card.Meta>
          </Feed.Summary>
          <Feed.Extra text>
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
            <CommentContainer comments={comments} postId={id} handleSubmit={this.handleSubmit} />
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { createPostComment, likePost, unlikePost })(PostShow);
