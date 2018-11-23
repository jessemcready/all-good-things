import React, { Component } from 'react';
import { Comment, Header, Form, Message } from 'semantic-ui-react'
import PostComment from '../components/posts/PostComment'
import { connect } from 'react-redux'

class CommentContainer extends Component {
  state = { userInput: '' }

  handleChange = event => this.setState({ userInput: event.target.value })

  handleComment = (event, input) => {
    const { handleSubmit } = this.props
    if(input.userInput !== ''){
      this.setState({ userInput: '' })
      handleSubmit(event, input)
    }
  }

  render() {
    const { comments, profile, errors } = this.props
    const { userInput } = this.state
    return(
      <Comment.Group>
        <Header as='h3' dividing className='robotoFam'>
          Comments
        </Header>
        {
          !profile ?
          <Form error onSubmit={event => this.handleComment(event, this.state)}>
            <Form.Input placeholder="Comment" fluid onChange={this.handleChange} value={userInput} />
            {
              errors !== '' ?
              <Message error header='Comment failed' content={errors} className='robotoFam' /> :
              null
            }
          </Form> :
          null
        }
        { comments.map( comment => <PostComment key={comment.id} {...comment} />) }
      </Comment.Group>
    );
  }
}

const mapStateToProps = ({ posts, users: { user }}) => ({ posts, user })

export default connect(mapStateToProps)(CommentContainer);
