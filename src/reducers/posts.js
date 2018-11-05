import { CREATE_POST, LIKE_POST, CREATE_POST_COMMENT } from '../constants/postActions'
import { LOGIN_OR_SIGNUP, SIGNOUT, FOLLOW_USER, UNFOLLOW_USER } from '../constants/userActions'

const initialState = []

export default(state = initialState, action) => {
  let index
  let post
  switch(action.type){
    case CREATE_POST:
      return [...state, action.post]
    case CREATE_POST_COMMENT:
      index = state.findIndex( post => post.id === action.postId)
      post = state[index]

      return [
        ...state.slice(0, index),
        Object.assign({}, post, { comments: [...post.comments, action.comment] }),
        ...state.slice(index + 1)
      ]
    case LOGIN_OR_SIGNUP:
      const posts = action.user.followers.map( follower => follower.posts )

      return [
        action.user.posts,
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
