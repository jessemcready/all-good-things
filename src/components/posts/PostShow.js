import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Feed, Card, Icon, Button, Label, Popup, Image } from 'semantic-ui-react'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'
import { createPostComment, reportPost } from '../../actions/posts'
import { likePost, unlikePost } from '../../actions/users'
import FetchAdapter from '../../adapters/FetchAdapter'

class PostShow extends Component {
  state = {
    liked: false,
    errors: ''
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
      if( commentObj.errors ){
        this.setState({ errors: commentObj.errors[0] })
      } else {
        const { id, post, user, content } = commentObj
        createPostComment({ id, post_id: post.id, user, content })
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

  handleReport = postId => {
    const { reportPost } = this.props
    FetchAdapter.reportPost(postId).then( postObj => {
      reportPost(postId)
    })
  }

  render() {
    const { liked, errors } = this.state
    const id = parseInt(this.props.match.params.id)
    const { posts } = this.props
    const post = posts.find( post => post.id === id)

    return post.user === undefined ?
    null :
    (
      <Feed.Event className='underNav'>
        <Card centered raised onClick={this.handlePostPage}>
        <Feed.Content>
          <Feed.Summary>
            <Image src={post.user.profile_url} size="mini" floated='left' circular />
            <Feed.User>
              <span className='robotoFam'>{ post.user.name }</span>
              {
                post.flagged ?
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
                  <Button inverted color='red' onClick={() => this.handleReport.post(id)} icon='warning'  className='popupButton' size='small' />
                }
                content='Post Reported!'
                on='click'
                position='top center'
                />
              }
            </Feed.User>
            <Card.Meta>
              <Feed.Date>
                <Moment fromNow ago>{post.created_at}</Moment> ago
              </Feed.Date>
            </Card.Meta>
          </Feed.Summary>
          <br />
          <Feed.Extra text className='robotoFam'>
            {post.content}
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
                  {post.likes.length}
                </Label>
              </Button>:
              <Button as='div' labelPosition='right' onClick={this.handleLike}>
                <Button color='red'>
                  <Icon name='heart' color='red' inverted />
                  Like
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {post.likes.length}
                </Label>
              </Button>
            }
            </Feed.Like>
            <CommentContainer comments={post.comments} postId={id} handleSubmit={this.handleSubmit} className='robotoFam' errors={errors} />
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
