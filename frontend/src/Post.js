import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment.js'
import './Post.css'

class Post extends Component {

  render() {
    return (
      <div className="post">
        <p className="title">Title by Author</p>
        <p className="voteScore">1</p>
        <p className="postBody">Body of a post</p>
        <Link className="detailsLink" to="/details"><p>Full Details</p></Link>
        <Comment />
      </div>
    )
  }
}

export const PostDetails = (props) => {
  return (
    <div className="postDetails">
      <h2>Post Details</h2>
      <h3 className="detailsTitle">Title</h3>
      <p className="postBody">Body of a post</p>
      <p className="author">Author</p>
      <p className="timestamp">12PM 12-12-12</p>
      <p className="voteScore">1</p>
    </div>
  )
}

export default Post
