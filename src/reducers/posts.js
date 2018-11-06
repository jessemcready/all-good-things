import { CREATE_POST, CREATE_POST_COMMENT } from '../constants/postActions'
import { LOGIN_OR_SIGNUP, SIGNOUT, FOLLOW_USER, UNFOLLOW_USER, LIKE_POST, UNLIKE_POST } from '../constants/userActions'

const initialState = []

export default(state = initialState, action) => {
  let index
  let post
  let likeIndex
  let like
  switch(action.type){
    case CREATE_POST:
      return [...state, action.post]
    case CREATE_POST_COMMENT:
      index = state.findIndex( post => post.id === action.comment.post_id)
      post = state[index]

      return [
        ...state.slice(0, index),
        Object.assign({}, post, { comments: [action.comment, ...post.comments] }),
        ...state.slice(index + 1)
      ]
    case LIKE_POST:
      index = state.findIndex( post => post.id === action.like.post_id )
      post = state[index]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, { likes: [...post.likes, action.like] }),
        ...state.slice(index + 1)
      ]
    case UNLIKE_POST:
      index = state.findIndex( post => post.id === action.postId )
      post = state[index]
      likeIndex = post.likes.findIndex( like => like.user_id === action.userId )
      like = post.likes[likeIndex]
      return [
        ...state.slice(0, index),
        Object.assign({}, post, {
          likes: [
            ...post.likes.slice(0, likeIndex - 1),
            ...post.likes.slice(likeIndex + 1)
          ]
        }),
        ...state.slice(index + 1)
      ]
    case LOGIN_OR_SIGNUP:
      const posts = action.user.followers.map( follower => follower.posts )
      return [
        ...action.user.posts,
        ...posts.flat()
      ]
    case FOLLOW_USER:
      const { user } = action
      return [
        ...state,
        ...user.posts
      ]
    case UNFOLLOW_USER:
      const { userId } = action
      const followedUsersPosts = state.filter( post => post.user_id !== userId)
      return [...followedUsersPosts]
    case SIGNOUT:
      return initialState
    default:
      return state
  }
}
