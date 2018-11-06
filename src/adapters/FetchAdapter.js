import { backendUrl } from '../constants/fetchUrls'
import { postHeader } from '../constants/fetchHeaders'

export default class FetchAdapter {

  static loginUser(userData) {
    return fetch(`${backendUrl}/login`,{
      ...postHeader,
      body: JSON.stringify(userData)
    }).then(res => res.json())
  }

}
