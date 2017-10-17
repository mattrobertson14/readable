import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI.js'
import Comment from './Comment.js'
import './Post.css'

class Post extends Component {
  render() {
    return (
      <div className="post">
        <p className="title">{this.props.details? this.props.details.title : "N/A"}</p>
        <p className="voteScore">{this.props.details? this.props.details.voteScore : "N/A"}</p>
        <p className="postBody"><b>{this.props.details? this.props.details.author : "N/A"}:</b> {this.props.details? this.props.details.body : "N/A"}</p>
        <Link className="detailsLink" to={"/details/"+this.props.details.id}><p>Full Details</p></Link>
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
