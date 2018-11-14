import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon, Modal, Form, TextArea, Button, Message } from 'semantic-ui-react'
import FetchAdapter from '../../adapters/FetchAdapter'
import { createPost } from '../../actions/posts'

class NewPostModal extends Component {
  state = {
    userInput: '',
    modalOpen: false,
    errors: ''
  }

  handleChange = (event) => {
    if(this.state.userInput.length < 400){
      this.setState({ userInput: event.target.value })
    }
  }

  handleSubmit = (event) => {
    const { user, createPost } = this.props
    const { userInput } = this.state
    const post = { user_id: user.id, content: userInput }
    if( userInput.length > 0){
      FetchAdapter.createPost(post).then( postObj => {
        debugger
        if( postObj.errors ){
          this.setState({ errors: postObj.errors[0] })
        } else {
          this.setState({ userInput: '', modalOpen: false })
          createPost(postObj.post)
        }
      })
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleMouseOut = () => { document.body.style.cursor = 'default' }
  handleMouseOver = () => { document.body.style.cursor = 'pointer' }

  render() {
    const { userInput, errors } = this.state

    const styles = {
        color: '#02bbee'
    }

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <Icon name='plus circle' onClick={this.handleOpen} onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut} style={styles} size='massive' />
        }>
        <Modal.Header className='robotoFam'>Create Post</Modal.Header>
        <Modal.Content>
          <Form error onSubmit={this.handleSubmit}>
            <TextArea
            className='robotoFam'
            placeholder='Put down some thoughts'
            onChange={this.handleChange}
            value={userInput}
            />
            <Button className='modalButton' color='teal'>Submit</Button>
            {
              errors !== '' ?
              <Message error header='Failed to create post' content={errors} className='robotoFam' /> :
              null
            }
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps, { createPost })(NewPostModal);
