import { LOGIN_OR_SIGNUP, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT, EDIT_USER, LIKE_POST, UNLIKE_POST } from '../constants/userActions'

const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    followers: [],
    likes: []
  }
}

export default(state = initialState, action) => {
  let index
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
        user: {
          ...state.user,
          likes: [
            ...state.user.likes,
            action.like
          ]
        }
      }
    case UNLIKE_POST:
      index = state.user.likes.findIndex( like => {
        if(like.post){
          return like.post.id === action.postId
        }
        return like.post_id === action.postId
      })
      return {
        user: {
          ...state.user,
          likes: [
            ...state.user.likes.slice(0, index),
            ...state.user.likes.slice(index + 1)
          ]
        }
      }
    case EDIT_USER:
      return Object.assign({}, action.user)
    case SIGNOUT:
      return initialState
    default:
      return state
  }
}
