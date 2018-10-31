import { LOGIN_OR_SIGNUP, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT } from '../constants/userActions'

const initialState = {
  id: null,
  name: '',
  email: '',
  followers: []
}

export default(state = initialState, action) => {
  let index
  let user
  switch(action.type){
    case LOGIN_OR_SIGNUP:
      return Object.assign({}, action.user)
    case FOLLOW_USER:
      return {
        ...state,
        followers: [
          ...state.followers,
          action.user
        ]
      }
    case UNFOLLOW_USER:
      index = state.followers.findIndex( follower => follower.id === action.userId)
      user = state.followers[index]
      return {
        ...state,
        followers: [
          ...state.followers.slice(0, index),
          ...state.followers.slice(index + 1)
        ]
      }
    case SIGNOUT:
      return initialState
    default:
      return state
  }
}
