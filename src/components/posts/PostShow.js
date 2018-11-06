import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Feed, Card, Icon } from 'semantic-ui-react'
import { postsUrl } from '../../constants/fetchUrls'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'
import { commentsUrl } from '../../constants/fetchUrls'
import { createPostComment } from '../../actions/posts'

class PostShow extends Component {
  state = {
    post: {},
    comments: [],
    liked: false
  }

  componentDidMount(){
    const { id } = this.props.match.params
    fetch(`${postsUrl}/${id}`).then(res => res.json()).then( post => {
      this.setState({ post, comments: post.comments })
    })
  }

  handleSubmit = (event, input) => {
    const { user } = this.props
    const { comments, post } = this.state
    const { userInput } = input
    fetch(commentsUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        comment: {
          post_id: post.id,
          user_id: user.id,
          content: userInput
        }
      })
    }).then(res => res.json()).then( commentObj => {
      this.setState({ comments: [commentObj, ...comments] })
      createPostComment({
        id: commentObj.id,
        post_id: commentObj.post.id,
        user: commentObj.user,
        content: commentObj.content
      })
    })
  }

  render() {
    const { post : { user, created_at, content, liked } } = this.state
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
            </Feed.Like>
            <CommentContainer comments={comments} postId={id} handleSubmit={this.handleSubmit} addComment={true} />
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

export default connect(mapStateToProps)(PostShow);
