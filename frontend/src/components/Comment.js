import React, { Component } from 'react'

class Comment extends Component {
  state = {
    comment: this.props.data
  }

  upVote = (id) => {
    let comment = this.state.comment
    comment.voteScore++
    this.setState({comment})
  }

  downVote = (id) => {
    let comment = this.state.comment
    comment.voteScore--
    this.setState({comment})
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
