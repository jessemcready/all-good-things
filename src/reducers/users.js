import { LOGIN_OR_SIGNUP, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT, EDIT_USER, LIKE_POST, UNLIKE_POST } from '../constants/userActions'

const initialState = {
  id: null,
  name: '',
  email: '',
  followers: [],
  likes: []
}

export default(state = initialState, action) => {
  let index
  // let post
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
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          action.like
        ]
      }
    case UNLIKE_POST:
      index = state.likes.findIndex( like => like.post_id === action.postId )
      debugger
      return {
        ...state,
        likes: [
          ...state.likes.slice(0, index - 1),
          ...state.likes.slice(index + 1)
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
