import {
  SET_CURRENT_USER, FOLLOW_USER, UNFOLLOW_USER, SIGNOUT, EDIT_USER, LIKE_POST, UNLIKE_POST
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
      // return Object.assign({}, action.user)
    case FOLLOW_USER:
      return {
        user: {...state.user, followers: [ action.user, ...state.user.followers ]}
      }
    case UNFOLLOW_USER:
      index = state.user.followers.findIndex( follower => follower.email === action.userEmail)
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
        user: {...state.user, likes: [ ...state.user.likes, action.like ]}
      }
    case UNLIKE_POST:
      index = state.user.likes.findIndex( like => like.id === action.likeId)
      debugger
      return {
        user: {
          ...state.user,
          likes: [
            ...state.user.likes.slice(0, index),
            ...state.user.likes.slice(index + 1)
          ]
        }
      }
    case DELETE_POST:
      index = state.user.posts.findIndex( post => post.id === action.postId )
      if( index === -1 ){
        return state
      } else {
        return {
          user: {
            ...state.user,
            posts: [
              ...state.user.posts.slice(0, index),
              ...state.user.posts.slice(index + 1)
            ]
          }
        }
      }
    case EDIT_USER:
      return Object.assign({}, action.user)
    case SIGNOUT:
      localStorage.clear()
      return initialState
    default:
      return state
  }
}
