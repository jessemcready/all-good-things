import {
  LOGIN_OR_SIGNUP,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SIGNOUT,
  EDIT_USER,
  LIKE_POST,
  UNLIKE_POST,
  SET_CURRENT_USER,
  AUTHENTICATING_USER,
  FAILED_LOGIN
} from '../constants/userActions'
import FetchAdapter from '../adapters/FetchAdapter'

// export const loginOrSignup = user => ({ type: LOGIN_OR_SIGNUP, user })
export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    FetchAdapter.loginUser(user).then( JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch(setCurrentUser(JSONResponse.user))
    }).catch( err => err.json().then( e => dispatch({ type: FAILED_LOGIN, payload: e.message })))
  }
}

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })

export const followUser = user => ({ type: FOLLOW_USER, user })

export const unfollowUser = userEmail => ({ type: UNFOLLOW_USER, userEmail })

export const signout = () => ({ type: SIGNOUT })

export const editUser = user => ({ type: EDIT_USER, user })

export const likePost = like => ({ type: LIKE_POST, like })

export const unlikePost = (postId, userId, userEmail, likeId) => {
  return { type: UNLIKE_POST, postId, userId, userEmail, likeId }
}
