import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Feed, Card, Icon, Button, Label, Popup, Image } from 'semantic-ui-react'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'
import { createPostComment, reportPost } from '../../actions/posts'
import { likePost, unlikePost } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostShow extends Component {
  state = { liked: false, errors: '' }

  componentDidMount(){
    const id = parseInt(this.props.match.params.id)
    const { user, posts, userLikes } = this.props
    if(posts.length === 0){
      return;
    }
    const currentPost = posts.find(post => post.post.id === id)
    debugger
    const foundPost = currentPost.post.likes.find(like => {
      return !!like.user ?
      like.user.id === user.id :
      like.user_id === user.id
    })
    if(!!foundPost){ this.setState({ liked: true, likeId: foundPost.id }) }
  }

  handleSubmit = (event, input) => {
    const { userInput } = input
    const id = parseInt(this.props.match.params.id)
    const { posts, user, createPostComment } = this.props
    const post = posts.find( post => post.post.id === id)
    const comment = { post_id: post.post.id, user_id: user.id, content: userInput }
    FetchAdapter.createComment(comment).then( commentObj => {
      if( commentObj.errors ){
        this.setState({ errors: commentObj.errors[0] })
      } else {
        const { id, post, user, content, created_at } = commentObj
        createPostComment({ id, post_id: post.id, user_id: user.id, content, created_at })
        this.setState({ errors: '' })
      }
    })
  }

  handleLike = () => {
    const { user, likePost } = this.props
    const id = parseInt(this.props.match.params.id)
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost(likeObj)
      this.setState({ liked: true, likeId: likeObj.id })
    })
  }

  handleUnlike = () => {
    const { unlikePost, user } = this.props
    const { likeId } = this.state
    const id = parseInt(this.props.match.params.id)
    debugger
    const like = { user_id: user.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, user.id, user.email, likeId)
      this.setState({ liked: false, likeId: '' })
    })
  }

  handleReport = postId => FetchAdapter.reportPost(postId).then( postObj => this.props.reportPost(postId) )

  render() {
    const { liked, errors } = this.state
    const id = parseInt(this.props.match.params.id)
    const { posts } = this.props
    const post = posts.find( post => post.post.id === id)
    return !!post ?
    (
      <Feed.Event className='underNav'>
        <Card centered raised onClick={this.handlePostPage} style={{ width: '25vw' }}>
        <Feed.Content>
          <Feed.Summary>
            <Image src={post.user.profile_url} size="mini" floated='left' circular />
            <Feed.User>
              <span className='robotoFam'>{ post.user.name }</span>
              {
                post.post.flagged ?
                <Popup
                trigger={
                  <Button inverted color='red' disabled icon='warning' size='small' className='popupButton' />
                }
                content='Post Reported!'
                on='click'
                position='top center'
                /> :
                <Popup
                trigger={
                  <Button inverted color='red' onClick={ () => this.handleReport(id) } icon='warning'  className='popupButton' size='small' />
                }
                content='Post Reported!'
                on='click'
                position='top center'
                />
              }
            </Feed.User>
            <Card.Meta>
              <Feed.Date>
                <Moment fromNow ago>{post.post.created_at}</Moment> ago
              </Feed.Date>
            </Card.Meta>
          </Feed.Summary>
          <br />
          <Feed.Extra text className='robotoFam'>
            {post.post.content}
          </Feed.Extra>
          <Feed.Meta>
          <br />
            <Feed.Like>
            {
              liked ?
              <Button as='div' labelPosition='right' onClick={this.handleUnlike}>
                <Button color='red'>
                  <Icon name='heart' color='red' inverted />
                  Unlike
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {post.post.likes.length}
                </Label>
              </Button>:
              <Button as='div' labelPosition='right' onClick={this.handleLike}>
                <Button color='red'>
                  <Icon name='heart' color='red' inverted />
                  Like
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {post.post.likes.length}
                </Label>
              </Button>
            }
            </Feed.Like>
            <CommentContainer comments={post.post.comments} postId={id} handleSubmit={this.handleSubmit} className='robotoFam' errors={errors} />
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    ) : <Redirect to='/' />

  }

}

const mapStateToProps = ({ posts, users: { user, userLikes }}) => ({ posts, user, userLikes })

export default connect(mapStateToProps, {
  createPostComment, likePost, unlikePost, reportPost
})(PostShow);
