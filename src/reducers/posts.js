import {
  CREATE_POST, CREATE_POST_COMMENT, DELETE_POST, REPORT_POST, UNREPORT_POST, FETCHED_FEED
} from '../constants/postActions'
import {
  LOGIN_OR_SIGNUP, SIGNOUT, FOLLOW_USER, UNFOLLOW_USER, LIKE_POST, UNLIKE_POST, EDIT_USER
} from '../constants/userActions'
import FetchAdapter from '../adapters/FetchAdapter'

const initialState = []

export default(state = initialState, action) => {
  let index
  let post
  let likeIndex
  switch(action.type){
    case CREATE_POST:
      return [action.post, ...state]
    case CREATE_POST_COMMENT:
      index = state.findIndex( post => post.id === action.comment.post_id)
      post = state[index]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, { comments: [action.comment, ...post.comments] }),
        ...state.slice(index + 1)
      ]
    case DELETE_POST:
      index = state.findIndex( post => post.id === action.postId)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    case REPORT_POST:
      index = state.findIndex( post => post.id === action.postId)
      post = state[index]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, { flagged: true }),
        ...state.slice(index + 1)
      ]
    case UNREPORT_POST:
      index = state.findIndex( post => post.id === action.postId)
      post = state[index]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, { flagged: false }),
        ...state.slice(index + 1)
      ]
    case LIKE_POST:
      index = state.findIndex( post => post.id === action.like.post.id )
      post = state[index]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, { likes: [...post.likes, action.like] }),
        ...state.slice(index + 1)
      ]
    case UNLIKE_POST:
      index = state.findIndex( post => post.id === action.postId )
      post = state[index]
      likeIndex = post.likes.findIndex( like => like.id === action.likeId )
      debugger
      return [
        ...state.slice(0, index),
        Object.assign({}, post, {
          likes: [
            ...post.likes.slice(0, likeIndex),
            ...post.likes.slice(likeIndex + 1)
          ]
        }),
        ...state.slice(index + 1)
      ]
    case FETCHED_FEED:
      return [...action.posts.flat()]
    case FOLLOW_USER:
      const { user } = action
      return [ ...state, ...user.posts ]
    case UNFOLLOW_USER:
      const { userEmail } = action
      const followedUsersPosts = state.filter( post => post.user.email !== userEmail)
      return [...followedUsersPosts]
    case EDIT_USER:
      const updatedUser = action.user.user
      const userPosts = state.filter( post => post.user.email === updatedUser.email )
      const nonUserPosts = state.filter(post => post.user.email !== updatedUser.email)
      const updatedUserPosts = userPosts.map( post => ({...post, user: updatedUser}))
      return [
        ...updatedUserPosts,
        ...nonUserPosts
      ]
    case SIGNOUT:
      return initialState
    default:
      return state
  }
}
