import {
  LOGIN_OR_SIGNUP,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SIGNOUT,
  EDIT_USER
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
