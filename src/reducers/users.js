import {
  SET_CURRENT_USER, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT, EDIT_USER, LIKE_POST, UNLIKE_POST, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN
} from '../constants/userActions'
import { DELETE_POST } from '../constants/postActions'

const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    followers: [],
    likes: [],
    posts: []
  },
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null,
  userFollowers: [],
  userLikes: [],
  userPosts: []
}

export default(state = initialState, action) => {
  let index
  switch(action.type){
    case SET_CURRENT_USER:
      return { ...state, user: action.user, loggedIn: true, authenticatingUser: false, userFollowers: action.user.followers, userLikes: action.user.likes, userPosts: action.user.posts }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN:
      return { ...state, failedLogin: true, error: action.payload, authenticatingUser: false }
    case FOLLOW_USER:
      return { ...state, userFollowers: [action.user, ...state.userFollowers] }
    case UNFOLLOW_USER:
      index = state.userFollowers.findIndex( follower => follower.email === action.userEmail)
      return { ...state, userFollowers: [...state.userFollowers.slice(0, index), ...state.userFollowers.slice(index + 1)] }
    case LIKE_POST:
      return { ...state, userLikes: [...state.userLikes, action.like] }
    case UNLIKE_POST:
      index = state.user.likes.findIndex( like => like.id === action.likeId)
      return { ...state, userLikes: [...state.userLikes.slice(0, index), ...state.userLikes.slice(index + 1)] }
    case DELETE_POST:
      index = state.user.posts.findIndex( post => post.id === action.postId )
      if( index === -1 ){
        return state
      } else {
        return { ...state, userPosts: [...state.userPosts.slice(0, index), ...state.userPosts.slice(index + 1)] }
      }
    case EDIT_USER:
      return { ...state, user: action.user }
    case SIGNOUT:
      localStorage.clear()
      return initialState
    default:
      return state
  }
}
