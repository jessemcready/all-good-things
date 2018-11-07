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
    liked: false
  }

  componentDidMount(){
    const { id } = this.props.match.params
    const { user } = this.props
    const foundPost = user.likes.find( like => {
      if(like.post){
        debugger
        return like.post.id === parseInt(id)
      }
      return like.post_id === parseInt(id)
    })
    if(foundPost){
      this.setState({ liked: true })
    }
  }

  handleSubmit = (event, input) => {
    const { userInput } = input
    const { id } = this.props.match.params
    const { posts, user, createPostComment } = this.props
    const post = posts.find( post => post.id === parseInt(id))
    const comment = { post_id: post.id, user_id: user.id, content: userInput }
    FetchAdapter.createComment(comment).then( commentObj => {
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
      likePost(likeObj)
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { unlikePost, user } = this.props
    const { id } = this.props.match.params
    const like = { user_id: user.id, post_id: parseInt(id) }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(parseInt(id), user.id, user.email)
      this.setState({ liked: false })
    })
  }

  render() {
    const { liked } = this.state
    const { id } = this.props.match.params
    const { posts } = this.props
    const post = posts.find( post => post.id === parseInt(id))

    if(post.user === undefined){
      return null
    }

    return (
      <Feed.Event style={{marginTop: '75px'}}>
        <Card centered raised onClick={this.handlePostPage}>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{ post.user.name }</Feed.User>
            <Card.Meta>
              <Feed.Date>
                <Moment fromNow ago>{post.created_at}</Moment> ago
              </Feed.Date>
            </Card.Meta>
          </Feed.Summary>
          <Feed.Extra text>
            {post.content}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
            {
              liked ?
              <Icon name='like' color='red' onClick={this.handleUnlike} /> :
              <Icon name='like' onClick={this.handleLike} />
            }
            {
              post.likes ?
              post.likes.length :
              0
             } Likes
            </Feed.Like>
            <CommentContainer comments={post.comments} postId={id} handleSubmit={this.handleSubmit} />
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { createPostComment, likePost, unlikePost })(PostShow);
