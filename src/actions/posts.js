import {
  CREATE_POST, CREATE_POST_COMMENT, DELETE_POST, REPORT_POST, UNREPORT_POST, FETCHED_FEED
} from '../constants/postActions'
import FetchAdapter from '../adapters/FetchAdapter'

export const createPost = post => ({ type: CREATE_POST, post })

export const createPostComment = comment => ({ type: CREATE_POST_COMMENT, comment})

export const deletePost = postId => ({ type: DELETE_POST, postId })

export const reportPost = postId => ({ type: REPORT_POST, postId })

export const unreportPost = postId => ({ type: UNREPORT_POST, postId })

export const getFeed = () => {
  return (dispatch) => {
    FetchAdapter.getFeed().then( posts => dispatch({ type: FETCHED_FEED, posts }))
  }
}
