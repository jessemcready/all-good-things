import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likePost } from '../../actions/posts'
import { likesUrl } from '../../constants/fetchUrls'

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
      this.setState({ liked: !this.state.liked })
    })
  }

  render() {
    const { username, content } = this.props
    const { liked } = this.state

    if( username === undefined || content === undefined){
      return null
    }

    return (
      <Card centered raised>
        <Card.Header>{ username }</Card.Header>
        <Card.Content>{ content }</Card.Content>
        <Card.Content extra>
          {
            liked ?
            <Button>Unlike</Button> :
            <Button onClick={this.handleLike}>Like</Button>
          }
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps, { likePost })(Post);
