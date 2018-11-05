import { CREATE_POST, LIKE_POST, CREATE_POST_COMMENT } from '../constants/postActions'

export const createPost = post => {
  return {
    type: CREATE_POST,
    post
  }
}

export const likePost = like => {
  return {
    type: LIKE_POST,
    like
  }
}

export const createPostComment = comment => {
  return {
    type: CREATE_POST_COMMENT,
    comment
  }
}
