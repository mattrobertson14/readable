import axios from 'axios'

const serverAddress = 'http://localhost:3001';

export const getAllPosts = () => {
  return new Promise((resolve, reject)=>{
    axios.get(serverAddress + '/posts', {
      headers: {'Authorization': 'something'},
      withCredentials: true
    }).then(response=>{
      resolve(response.data)
    }).catch(reject)
  })
}

export const getAllCategories = () => {
  return new Promise ((resolve, reject) => {
    axios.get(serverAddress + '/categories', {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data.categories)
    }).catch(reject)
  })
}

export const getPost = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(serverAddress + '/posts/' + id, {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data)
    }).catch(reject)
  })
}

export const getPostComments = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(serverAddress + '/posts/' + id + '/comments', {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data)
    }).catch(reject)
  })
}


/* TEMPLATE FOR NEW API CALL:

return new Promise((resolve, reject) => {
  axios.get(serverAddress + URL HERE, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then(response => {
    resolve(response.data)
  }).catch(reject)
})

*/
