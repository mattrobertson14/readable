import React, { Component } from 'react'
import * as ReadableAPI from '../ReadableAPI.js'

class Comment extends Component {
  state = {
    comment: this.props.data,
    editable: false
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

  submitEdit = () => {
    let id = this.state.comment.id
    let timestamp = Date.now()
    let body = document.getElementById(`commentBody${id}`).value
    //console.log(`id: ${id}\ntimestamp: ${timestamp}\nbody: ${body}`)
    if (body !== this.state.comment.body){
      ReadableAPI.editComment(id, timestamp, body).then((res) => {
        let comment = this.state.comment
        comment.body = body
        comment.timestamp = timestamp
        this.setState({comment, editable : false})
      })
    } else {
      this.setState({editable : false})
    }
  }

  render() {
    return (
      <div className="comment">
        {this.state.editable?
          <span className="withEdit">
            <p className="author">{this.state.comment.author}
              <button className="saveEditCommentButton" onClick={this.submitEdit}>
                <i className="fa fa-check" />
              </button>
              <button className="cancelEditCommentButton" onClick={()=>this.setState({ editable : false })}>
                <i className="fa fa-times" />
              </button>
            </p>
            <input className="editCommentBody" id={`commentBody${this.state.comment.id}`} type="text" defaultValue={this.state.comment.body} />
          </span>:
          <span className="withoutEdit">
            <p className="author">{this.state.comment.author}
              <button className="editCommentButton" onClick={()=>this.setState({ editable :true })}>
                <i className="fa fa-pencil" />
              </button>
            </p>
            <p className="commentBody">{this.state.comment.body}</p>
              <p className="voteScore">
                <a onClick={() => this.downVote(this.state.comment.id)}><i className="fa fa-thumbs-o-down"/></a>
                {this.state.comment.voteScore}
                <a onClick={() => this.upVote(this.state.comment.id)}><i className="fa fa-thumbs-o-up" /></a>
              </p>
          </span>
        }
      </div>
    )
  }
}

export default Comment
