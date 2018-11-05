import {
  LOGIN_OR_SIGNUP,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SIGNOUT,
  EDIT_USER,
  LIKE_POST,
  UNLIKE_POST
} from '../constants/userActions'

export const loginOrSignup = user => {
  return {
    type: LOGIN_OR_SIGNUP,
    user
  }
}

export const followUser = user => {
  return {
    type: FOLLOW_USER,
    user
  }
}

export const unfollowUser = userId => {
  return {
    type: UNFOLLOW_USER,
    userId
  }
}

export const signout = () => {
  return {
    type: SIGNOUT
  }
}

export const editUser = user => {
  return {
    type: EDIT_USER,
    user
  }
}

export const likePost = like => {
  return {
    type: LIKE_POST,
    like
  }
}

export const unlikePost = (postId, userId) => {
  return {
    type: UNLIKE_POST,
    postId,
    userId
  }
}
