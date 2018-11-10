import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Feed, Card, Icon } from 'semantic-ui-react'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'
import { createPostComment, reportPost } from '../../actions/posts'
import { likePost, unlikePost } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostShow extends Component {
  state = {
    liked: false
  }

  componentDidMount(){
    const id = parseInt(this.props.match.params.id)
    const { user } = this.props
    const foundPost = user.likes.find( like =>
      like.post ? like.post.id === id : like.post_id === id
    )
    if(foundPost){
      this.setState({ liked: true })
    }
  }

  handleSubmit = (event, input) => {
    const { userInput } = input
    const id = parseInt(this.props.match.params.id)
    const { posts, user, createPostComment } = this.props
    const post = posts.find( post => post.id === id)
    const comment = { post_id: post.id, user_id: user.id, content: userInput }
    FetchAdapter.createComment(comment).then( commentObj => {
      const { id, post, user, content } = commentObj
      createPostComment({ id, post_id: post.id, user, content })
    })
  }

  handleLike = () => {
    const { user, likePost } = this.props
    const id = parseInt(this.props.match.params.id)
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost(likeObj)
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { unlikePost, user } = this.props
    const id = parseInt(this.props.match.params.id)
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, user.id, user.email)
      this.setState({ liked: false })
    })
  }

  handleReport = () => {
    const { id, reportPost } = this.props
    FetchAdapter.reportPost(id).then( postObj => {
      reportPost(id)
    })
  }

  render() {
    const { liked } = this.state
    const id = parseInt(this.props.match.params.id)
    const { posts } = this.props
    const post = posts.find( post => post.id === id)

    return post.user === undefined ?
    null :
    (
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
            {
              post.flagged ?
              <Icon name='warning' disabled style={{position: 'absolute', right: '0'}} /> :
              <Icon name='warning' style={{position: 'absolute', right: '0'}} onClick={this.handleReport} />
            }
            <CommentContainer comments={post.comments} postId={id} handleSubmit={this.handleSubmit} />
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    );
  }

}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps, {
  createPostComment, likePost, unlikePost, reportPost
})(PostShow);
