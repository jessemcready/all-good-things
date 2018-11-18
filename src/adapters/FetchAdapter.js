import { backendUrl } from '../constants/fetchUrls'
import { postHeader, deleteHeader, patchHeader, loginHeader, getHeader } from '../constants/fetchHeaders'

export default class FetchAdapter {

  static loginUser(userData) {
    return fetch(`${backendUrl}/login`,{
      ...loginHeader,
      body: JSON.stringify({ user: userData })
    }).then(res => res.json())
  }

  static signupUser(userData, profileUrl=''){
    return fetch(`${backendUrl}/users`, {
      ...postHeader,
      body: JSON.stringify({ user: {...userData, profile_url: profileUrl }})
    }).then(res => res.json())
  }

  static getUsers(){
    return fetch(`${backendUrl}/users`,{
      ...getHeader
    }).then(res => res.json())
  }

  static createLike(like){
    return fetch(`${backendUrl}/likes`, {
      ...postHeader,
      body: JSON.stringify({ like })
    }).then(res => res.json())
  }

  static deleteLike(like) {
    return fetch(`${backendUrl}/likes`, {
      ...deleteHeader,
      body: JSON.stringify({ like })
    }).then(res => res.json())
  }

  static getPost(id){
    return fetch(`${backendUrl}/posts/${id}`, {
      ...getHeader
    }).then(res => res.json())
  }

  static createComment(comment){
    return fetch(`${backendUrl}/comments`, {
      ...postHeader,
      body: JSON.stringify({ comment })
    }).then(res => res.json())
  }

  static getUser(id){
    return fetch(`${backendUrl}/users/${id}`, {
      ...getHeader
    }).then(res => res.json())
  }

  static updateUser(id, user){
    return fetch(`${backendUrl}/users/${id}`, {
      ...patchHeader,
      body: JSON.stringify({ user })
    }).then(res => res.json())
  }

  static deleteUser(id){
    return fetch(`${backendUrl}/users/${id}`, {
      ...deleteHeader
    }).then(res => res.json())
  }

  static followUser(relationship){
    return fetch(`${backendUrl}/relationships`, {
      ...postHeader,
      body: JSON.stringify({ relationship })
    }).then(res => res.json())
  }

  static unfollowUser(relationship){
    return fetch(`${backendUrl}/relationships`, {
      ...deleteHeader,
      body: JSON.stringify({ relationship })
    }).then(res => res.json())
  }

  static createPost(post){
    return fetch(`${backendUrl}/posts`,{
      ...postHeader,
      body: JSON.stringify({ post })
    }).then(res => res.json())
  }

  static getCurrentUser(){
    return fetch(`${backendUrl}/users/current`, {
      ...getHeader
    }).then(res => res.json())
  }

  static reportPost(id){
    return fetch(`${backendUrl}/report/${id}`, postHeader).then(res => res.json())
  }

  static unreportPost(id){
    return fetch(`${backendUrl}/unreport/${id}`, postHeader)
    .then(res => res.json())
  }

  static deletePost(id){
    return fetch(`${backendUrl}/posts/${id}`, deleteHeader).then(res=>res.json())
  }

  static getFeed() {
    return fetch(`${backendUrl}/feed`, getHeader).then(res => res.json())
  }
}
