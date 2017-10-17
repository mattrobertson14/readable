import React, { Component } from 'react'
import * as ReadableAPI from '../ReadableAPI.js'
import { Link } from 'react-router-dom'
import './Post.css'
import Comment from './Comment'

class PostDetails extends Component {
  state = {
    post: {},
    comments: []
  }

  componentDidMount() {
    ReadableAPI.getPost(this.props.match.params.id).then(res => {
      this.setState({ post : res })
    }).catch(error => {
      console.log("this post couldn't be found")
    })

    ReadableAPI.getPostComments(this.props.match.params.id).then(res => {
      this.setState({ comments : res })
    }).catch(error => {
      console.log("this post couldn't be found")
    })
  }

  render() {
    return (
      <div className="postDetails">
        <Link className="iBackButton" to="/"><button>Back To Main Page</button></Link>
        <h2>Post Details</h2>
        <h3 className="iPostTitle">Title: {this.state.post.title}</h3>
        <p className="iPostBody"><b>Body:</b> {this.state.post.body}</p>
        <p className="iAuthor"><b>Author:</b> {this.state.post.author}</p>
        <p className="iVoteScore"><b>Votescore:</b> - {this.state.post.voteScore} +</p>
        <p className="iTimestamp"><b>Timestamp:</b> {this.state.post.timestamp}</p>
        <p className="iId"><b>ID:</b> {this.state.post.id}</p>
        <p className="iPostCategory"><b>Category:</b> {this.state.post.category}</p>
        <p className="iCommentsTitle"><b>Comments ({this.state.comments.length}):</b></p>
        {this.state.comments.sort((a,b)=>{
          return parseInt(a.voteScore,10)-parseInt(b.voteScore,10)
          }).map(com => (
            <Comment data={com} key={com.id}/>
          ))
        }

      </div>
    )
  }
}

export default PostDetails
