import { backendUrl } from '../constants/fetchUrls'
import { postHeader } from '../constants/fetchHeaders'

export default class FetchAdapter {

  static loginUser(userData) {
    return fetch(`${backendUrl}/login`,{
      ...postHeader,
      body: JSON.stringify(userData)
    }).then(res => res.json())
  }

  static signupUser(userData){
    return fetch(`${backendUrl}/users`, {
      ...postHeader,
      body: JSON.stringify({ user: userData })
    }).then(res => res.json())
  }

  static getUsers(){
    return fetch(`${backendUrl}/users`).then(res => res.json())
  }

}
