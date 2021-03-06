export const loginHeader = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const postHeader = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const deleteHeader = {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${localStorage.jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const patchHeader = {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${localStorage.jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const getHeader = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.jwt}`
  }
}
