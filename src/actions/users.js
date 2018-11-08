import {
  LOGIN_OR_SIGNUP,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SIGNOUT,
  EDIT_USER,
  LIKE_POST,
  UNLIKE_POST
} from '../constants/userActions'

export const loginOrSignup = user => ({ type: LOGIN_OR_SIGNUP, user })

export const followUser = user => ({ type: FOLLOW_USER, user })

export const unfollowUser = userId => ({ type: UNFOLLOW_USER, userId })

export const signout = () => ({ type: SIGNOUT })

export const editUser = user => ({ type: EDIT_USER, user })

export const likePost = like => ({ type: LIKE_POST, like })

export const unlikePost = (postId, userId, userEmail) => {
  return {
    type: UNLIKE_POST,
    postId,
    userId,
    userEmail
  }
}
