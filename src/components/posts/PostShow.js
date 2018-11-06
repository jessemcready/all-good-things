import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Feed, Card, Icon } from 'semantic-ui-react'
import { postsUrl } from '../../constants/fetchUrls'
import Post from './Post'
import CommentContainer from '../../containers/CommentContainer'
import Moment from 'react-moment'

class PostShow extends Component {
  state = {
    post: {},
    liked: false
  }

  componentDidMount(){
    const { id } = this.props.match.params
    fetch(`${postsUrl}/${id}`).then(res => res.json()).then( post => {
      this.setState({ post })
    })
  }

  render() {
    const { post : { comments, likes, user, created_at, content, liked } } = this.state
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
            <CommentContainer comments={comments} postId={id} />
          </Feed.Meta>
        </Feed.Content>
        </Card>
      </Feed.Event>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(PostShow);
