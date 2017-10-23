import React, { Component } from 'react'
import * as ReadableAPI from '../ReadableAPI.js'

class Comment extends Component {
  state = {
    comment: this.props.data
  }

  upVote = (id) => {
    ReadableAPI.changeVoteComment(id,"upVote").then((res) =>{
      let comment = this.state.comment
      comment.voteScore++
      this.setState({comment})
    })
  }

  downVote = (id) => {
    ReadableAPI.changeVoteComment(id,"downVote").then((res) =>{
      let comment = this.state.comment
      comment.voteScore--
      this.setState({comment})
    })
  }

  render() {
    return (
      <div className="comment">
        <p className="author">{this.state.comment.author}</p>
        <p className="commentBody">{this.state.comment.body}</p>
        <p className="voteScore">
          <a onClick={() => this.downVote(this.state.comment.id)}><i className="fa fa-thumbs-o-down"/></a>
          {this.state.comment.voteScore}
          <a onClick={() => this.upVote(this.state.comment.id)}><i className="fa fa-thumbs-o-up" /></a>
        </p>
      </div>
    )
  }
}

export default Comment
