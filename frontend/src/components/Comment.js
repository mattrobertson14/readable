import React, { Component } from 'react'

class Comment extends Component {

  render() {
    return (
      <div className="comment">
        <p className="author">Author:</p>
        <p className="commentBody">Body of a comment Body of a comment Body of a comment Body of a comment </p>
        <p className="voteScore">1</p>
      </div>
    )
  }
}

export default Comment
