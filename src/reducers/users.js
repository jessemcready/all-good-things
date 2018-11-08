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
      localStorage.setItem('jwt', action.user.jwt)
      return Object.assign({}, action.user)
    case FOLLOW_USER:
      return {
        user: {
          ...state.user,
          followers: [
            action.user,
            ...state.user.followers
          ]
        }
      }
    case UNFOLLOW_USER:
      index = state.user.followers.findIndex( follower => follower.id === action.userId)
      return {
        user: {
          ...state.user,
          followers: [
            ...state.user.followers.slice(0, index),
            ...state.user.followers.slice(index + 1)
          ]
        }
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
      localStorage.removeItem('jwt')
      return initialState
    default:
      return state
  }
}
