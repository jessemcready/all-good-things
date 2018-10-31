import { CREATE_POST, LIKE_POST, CREATE_POST_COMMENT } from '../constants/postActions'

export const createPost = post => {
  return {
    type: CREATE_POST,
    post
  }
}

export const likePost = postId => {
  return {
    type: LIKE_POST,
    postId
  }
}

export const createPostComment = comment => {
  return {
    type: CREATE_POST_COMMENT,
    comment
  }
}
