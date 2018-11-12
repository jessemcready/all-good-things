import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon, Modal, Form, TextArea, Button } from 'semantic-ui-react'
import FetchAdapter from '../../adapters/FetchAdapter'
import { createPost } from '../../actions/posts'

class NewPostModal extends Component {
  state = {
    userInput: '',
    modalOpen: false
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
        this.setState({ userInput: '', modalOpen: false })
        createPost(postObj.post)
      })
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { userInput } = this.state

    const styles = {
        position: 'fixed',
        bottom: '0',
        right: '0',
        color: '#02bbee'
    }

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <Icon name='plus circle' onClick={this.handleOpen} style={styles} size='huge' />
        }>
        <Modal.Header style={{fontFamily:'Roboto'}}>Create Post</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <TextArea
            style={{fontFamily:'Roboto'}}
            placeholder='Put down some thoughts'
            onChange={this.handleChange}
            value={userInput}
            />
            <Button style={{fontFamily:'Roboto', marginTop: '1em'}} color='teal'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = ({ users: { user }}) => ({ user })

export default connect(mapStateToProps, { createPost })(NewPostModal);
