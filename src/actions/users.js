import { LOGIN_OR_SIGNUP, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT } from '../constants/userActions'

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
