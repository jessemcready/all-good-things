import React, { Component } from 'react';
import { Card, Button, Feed, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/users'
import { likesUrl } from '../../constants/fetchUrls'
import Moment from 'react-moment'

class Post extends Component {
  state = {
    liked : false
  }

  componentDidMount(){
    const { id, user } = this.props
    const foundPost = user.likes.find( like => {
      return like.post_id === id
    })
    if(foundPost){
      this.setState({ liked: true })
    }
  }

  handleLike = () => {
    const { id, user, likePost } = this.props
    fetch(likesUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        like: {
          user_id: user.id,
          post_id: id
        }
      })
    }).then(res => res.json()).then(likeObj => {
      likePost({ id: likeObj.id, user_id: user.id, post_id: id })
      this.setState({ liked: true })
    })
  }

  handleUnlike = () => {
    const { id, unlikePost, user } = this.props
    fetch(likesUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        like: {
          user_id: user.id,
          post_id: id
        }
      })
    }).then(res => res.json()).then( deletedObj => {
      unlikePost(id, user.id)
      this.setState({ liked: false })
    })
  }

  render() {
    const { username, content, likes, comments, created_at } = this.props
    const { liked } = this.state
    debugger
    if( username === undefined || content === undefined){
      return null
    }

    return (
      <Feed.Event>
        <Card centered raised>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{username}</Feed.User>
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
              { likes ? likes.length : 0 } Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps, { likePost, unlikePost })(Post);
