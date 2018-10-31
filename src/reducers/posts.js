import { CREATE_POST, LIKE_POST, CREATE_POST_COMMENT } from '../constants/postActions'

const initialState = []

export default(state = initialState, action) => {
  let index
  let post
  switch(action.type){
    case CREATE_POST:
      return [...state, action.post]
    case LIKE_POST:
      index = state.findIndex( post => post.id === action.postId)
      post = state[index]

      return [
        ...state.slice(0, index),
        Object.assign({}, post, { likes: [...post.likes, action.like] }),
        ...state.slice(index + 1)
      ]
    case CREATE_POST_COMMENT:
      index = state.findIndex( post => post.id === action.postId)
      post = state[index]

      return [
        ...state.slice(0, index),
        Object.assign({}, post, { comments: [...post.comments, action.comment] }),
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}
