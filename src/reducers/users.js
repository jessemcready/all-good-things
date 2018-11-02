import { LOGIN_OR_SIGNUP, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT, EDIT_USER } from '../constants/userActions'

const initialState = {
  id: null,
  name: '',
  email: '',
  followers: []
}

export default(state = initialState, action) => {
  let index
  // let user
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
      return {
        ...state,
        followers: [
          ...state.followers.slice(0, index - 1),
          ...state.followers.slice(index + 1)
        ]
      }
    case EDIT_USER:
      return Object.assign({}, action.user)
    case SIGNOUT:
      return initialState
    default:
      return state
  }
}
