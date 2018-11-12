import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Feed, Icon, Button, Label, Popup } from 'semantic-ui-react'
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
    const { id, reportPost } = this.props
    FetchAdapter.reportPost(id).then( postObj => {
      reportPost(id)
    })
  }

  render() {
    const {
      id, content, comments, created_at, user, likes, profile, flagged
    } = this.props
    const { liked, clicked, usernameClick } = this.state

    return user.name === undefined && content === undefined ?
    null :
    (
      <Fragment>
      {
        clicked ?
        <Redirect to={`/posts/${id}`} /> :
        <Feed.Event style={{margin: '20px'}}>
          <Card centered raised>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
              {
                usernameClick ?
                <Redirect to={`/profile/${user.id}`} /> :
                <span onClick={this.handleUserClick}>{user.name}</span>
              }
              {
                flagged ?
                <Popup
                trigger={
                  <Button basic color='red' disabled icon='warning' size='small' style={{ width: '50px', position: 'absolute', right: '0' }}/>
                }
                content='Post Reported!'
                on='click'
                position='top center'
                /> :
                <Popup
                trigger={
                  <Button basic color='red' onClick={this.handleReport} icon='warning'  style={{ width: '50px', position: 'absolute', right: '0' }} size='small' />
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
                    {likes.length}
                  </Label>
                </Button>:
                <Button as='div' labelPosition='right' onClick={this.handleLike}>
                  <Button color='red'>
                    <Icon name='heart' color='red' inverted />
                    Like
                  </Button>
                  <Label basic color='red' pointing='left'>
                    {likes.length}
                  </Label>
                </Button>
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

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, users: user })

export default connect(mapStateToProps, {
   likePost, unlikePost, createPostComment, reportPost
 })(Post);
