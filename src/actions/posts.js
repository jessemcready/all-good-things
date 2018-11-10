import { CREATE_POST, CREATE_POST_COMMENT, DELETE_POST } from '../constants/postActions'

export const createPost = post => ({ type: CREATE_POST, post })

export const createPostComment = comment => ({ type: CREATE_POST_COMMENT, comment})

export const deletePost = postId => ({ type: DELETE_POST, postId })
