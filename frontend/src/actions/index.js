export const ADD_POST = 'ADD_POST'
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'

export const addAllPosts = ({ title, author, body }) => {
  return {
    type: ADD_ALL_POSTS,
    title,
    author,
    body
  }
}
