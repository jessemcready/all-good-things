import { CREATE_POST, CREATE_POST_COMMENT } from '../constants/postActions'

export const createPost = post => ({ type: CREATE_POST, post })

export const createPostComment = comment => ({ type: CREATE_POST_COMMENT, comment})
