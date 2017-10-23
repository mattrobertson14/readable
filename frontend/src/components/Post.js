import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI.js'
import './Post.css'

class Post extends Component {
  state={
    post: this.props.details
  }

  upVote = (id) => {
    ReadableAPI.changeVote(id,"upVote").then((res) =>{
      let post = this.state.post
      post.voteScore++
      this.setState({post})
    })
  }

  downVote = (id) => {
    ReadableAPI.changeVote(id,"downVote").then((res) =>{
      let post = this.state.post
      post.voteScore--
      this.setState({post})
    })
  }

  render() {
    return (
      <div className="post">
        <p className="title">{this.state.post.title}</p>
        <p className="voteScore">
          <a onClick={() => this.downVote(this.state.post.id)}><i className="fa fa-thumbs-o-down"/></a>
          {this.state.post.voteScore}
          <a onClick={() => this.upVote(this.state.post.id)}><i className="fa fa-thumbs-o-up" /></a>
        </p>
        <p className="postBody"><b>{this.state.post.author}:</b> {this.state.post.body}</p>
        <Link className="detailsLink" to={"/details/"+this.state.post.id}>Full Details</Link>
      </div>
    )
  }
}

export default Post
