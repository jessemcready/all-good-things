import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Feed, Icon, Button, Label, Popup, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/users'
import { createPostComment, reportPost } from '../../actions/posts'
import Moment from 'react-moment'
import CommentContainer from '../../containers/CommentContainer'
import FetchAdapter from '../../adapters/FetchAdapter'

class Post extends Component {
  state = {
    liked : false,
    clicked: false,
    usernameClick: false,
    errors: ''
  }

  componentDidMount(){
    const { id, users, likes } = this.props
    let foundPost
    !!likes ? foundPost = users.likes.find(like => likes.some(postLike => postLike.id === like.id))
    : foundPost = false
    if(foundPost){
      this.setState({ liked: true, likeId: foundPost.id })
    }
  }

  handleSubmit = (event, input) => {
    const { users, createPostComment, id, comments } = this.props
    const { userInput } = input
    const comment = { post_id: id, user_id: users.id, content: userInput }
    FetchAdapter.createComment(comment).then( commentObj => {
      if( commentObj.errors ){
        this.setState({ errors: commentObj.errors })
      } else {
        this.setState({ comments: [commentObj, ...comments], errors: '' })
        const { id, post, user, content } = commentObj
        createPostComment({ id, post_id: post.id, user, content })
      }
    })
  }

  handleLike = () => {
    const { id, users, likePost } = this.props
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.createLike(like).then(likeObj => {
      likePost(likeObj)
      this.setState({ liked: true, likeId: likeObj.id })
    })
  }

  handleUnlike = () => {
    const { id, unlikePost, users } = this.props
    const { likeId } = this.state
    const like = { user_id: users.id, post_id: id }
    FetchAdapter.deleteLike(like).then( deletedObj => {
      unlikePost(id, users.id, users.email, likeId)
      this.setState({ liked: false })
    })
  }

  handlePostPage = () => this.setState({ clicked: true })

  handleUserClick = () => this.setState({ usernameClick: true })

  handleReport = () => {
    const { id, reportPost } = this.props
    FetchAdapter.reportPost(id).then( postObj => {
      reportPost(id)
    })
  }

  render() {
    debugger
    const {
      post: { id, content, created_at, flagged },
      user: { email, name, profile_url }, users, posts
    } = this.props
    const { liked, clicked, usernameClick, errors } = this.state

    return name === undefined && content === undefined ?
    null :
    (
      <Fragment>
      {
        clicked ?
        <Redirect to={`/posts/${id}`} /> :
        <Feed.Event style={{margin: '20px'}}>
          <Card centered raised style={{ width: '25vw' }}>
          <Feed.Content>
            <Feed.Summary>
              <Image src={profile_url} size="mini" floated='left' circular />
              <Feed.User>
              {
                usernameClick ?
                <Redirect to={`/profile/${users.id}`} /> :
                <span onClick={this.handleUserClick}>{name}</span>
              }
              {
                flagged ?
                <Popup
                trigger={
                  <Button inverted color='red' disabled icon='warning' size='small' className='popupButton'/>
                }
                content='Post Reported!'
                on='click'
                position='top center'
                /> :
                <Popup
                trigger={
                  <Button inverted color='red' onClick={this.handleReport} icon='warning' className='popupButton' size='small' />
                }
                content='Post Reported!'
                on='click'
                position='top center'
                />
              }
              </Feed.User>
              <Card.Meta>
                <Feed.Date>
                  <Moment fromNow ago>{created_at}</Moment> ago
                </Feed.Date>
              </Card.Meta>
            </Feed.Summary>
            <br />
            <Feed.Extra text onClick={this.handlePostPage}>
              {content}
            </Feed.Extra>
            <br />
            <Feed.Meta>
              <Feed.Like>
              {
                liked ?
                <Button as='div' labelPosition='right' onClick={this.handleUnlike}>
                  <Button color='red'>
                    <Icon name='heart' color='red' inverted />
                    Unlike
                  </Button>
                  <Label basic color='red' pointing='left'>
                    {
                      !!likes ?
                      likes.length :
                      0
                    }
                  </Label>
                </Button>:
                <Button as='div' labelPosition='right' onClick={this.handleLike}>
                  <Button color='red'>
                    <Icon name='heart' color='red' inverted />
                    Like
                  </Button>
                  <Label basic color='red' pointing='left'>
                  {
                    !!likes ?
                    likes.length :
                    0
                  }
                  </Label>
                </Button>
              }
              </Feed.Like>
              {
                !!comments ?
                <CommentContainer comments={comments.slice(0, 2)} postId={id} handleSubmit={this.handleSubmit} profile={profile} errors={errors} /> :
                <CommentContainer comments={[]} postId={id} handleSubmit={this.handleSubmit} profile={profile} errors={errors} />
              }
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

export default connect(mapStateToProps, {
   likePost, unlikePost, createPostComment, reportPost
 })(Post);
