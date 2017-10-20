import React, { Component } from 'react'
import * as ReadableAPI from '../ReadableAPI.js'
import { Link } from 'react-router-dom'
import './Post.css'
import Comment from './Comment'
import uuidv4 from 'uuid/v4'

class PostDetails extends Component {
  state = {
    post: {},
    comments: [],
    showCommentForm: false
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

  upVote = (id) => {
    let post = this.state.post
    post.voteScore++
    this.setState({post})
  }

  downVote = (id) => {
    let post = this.state.post
    post.voteScore--
    this.setState({post})
  }

  addComment = () => {
    let id = uuidv4()
    let timestamp = Date.now()
    let body = document.getElementById("commentBody").innerText
    let author = document.getElementById("commentAuthor").innerText
    let parentId = this.state.post.id
    console.log(`id: ${id}\ntimestamp: ${timestamp}\nbody: ${body}\nauthor: ${author}\nparentId: ${parentId}`)
    ReadableAPI.addComment(id, timestamp, body, author, parentId).then((res) => {
      let newcomment = {id, timestamp, body, author, parentId, voteScore: 1}
      let oldcomments = this.state.comments
      oldcomments.push(newcomment)
      this.setState({showCommentForm : false, comments : oldcomments})
    })
  }

  render() {
    let buttonContent = "<< Back To Main Page"
    return (
      <div className="postDetails">
        <Link to="/"><button className="iBackButton">{buttonContent}</button></Link>
        <h2>Post Details</h2>
        <h3 className="iPostTitle">Title: {this.state.post.title}</h3>
        <p className="iPostBody"><b>Body:</b> {this.state.post.body}</p>
        <p className="iAuthor"><b>Author:</b> {this.state.post.author}</p>
        <p className="iVoteScore"><b>Votescore:</b>
          <a onClick={() => this.downVote(this.state.post.id)}><i className="fa fa-thumbs-o-down"/></a>
          {this.state.post.voteScore}
          <a onClick={() => this.upVote(this.state.post.id)}><i className="fa fa-thumbs-o-up" /></a>
        </p>
        <p className="iTimestamp"><b>Timestamp:</b> {this.state.post.timestamp? makeDateReadable(this.state.post.timestamp) : null}</p>
        <p className="iId"><b>ID:</b> {this.state.post.id}</p>
        <p className="iPostCategory"><b>Category:</b> {this.state.post.category}</p>
        <p className="iCommentsTitle"><b>Comments ({this.state.comments.length}):</b></p>
        {this.state.showCommentForm?
          <span>
            <NewCommentForm />
            <button className="formSubmit" onClick={this.addComment}>Submit</button>
            <button className="formCancel" onClick={()=>{this.setState({showCommentForm : false})}}>
              <i className="fa fa-times" /> Cancel
            </button>
          </span>
          :
          <button className="newCommentButton" onClick={()=>{this.setState({showCommentForm : true })}}>+ Add New Comment</button>
        }
        {this.state.comments.sort((a,b)=>{
          return parseInt(b.voteScore,10)-parseInt(a.voteScore,10)
          }).map(com => (
            <Comment data={com} key={com.id}/>
          ))
        }

      </div>
    )
  }
}

const NewCommentForm = (props) => {
  return (
    <div className="NewCommentForm">
      <div contentEditable="true"className="authorInput" id="commentAuthor" placeholder="Author" />
      <div contentEditable="true" className="bodyInput" placeholder="Enter your comment here..." id="commentBody" />
    </div>
  )
}

function makeDateReadable(d){
  let date = new Date(d)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  let newDate = month + "-" + day + "-" + date.getFullYear() + "_" +  hour + ":" + min + ":" + sec;
  return newDate
}

export default PostDetails
