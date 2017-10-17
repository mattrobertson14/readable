import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import Post from './Post.js'
import PostDetails from './PostDetails.js'
import * as ReadableAPI from '../ReadableAPI.js'
import uuidv4 from 'uuid/v4'

class App extends Component {
  state = {
    showNewPostForm: false,
    posts: [],
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getAllPosts().then( res => {
      this.setState({ posts : res })
    }).catch(error=>{
      console.log("No posts were retrieved")
    })

    ReadableAPI.getAllCategories().then( res => {
      this.setState({ categories : res })
    }).catch( error => {
      console.log("No categories were retrieved")
    })
  }

  showForm = () => {
    this.setState({ showNewPostForm : true })
  }

  closeForm = () => {
    this.setState({ showNewPostForm : false })
  }

  addPost = () => {
    let id = uuidv4();
    let timestamp = Date.now()
    let title = document.getElementById("postTitle").innerText
    let body = document.getElementById("postBody").innerText
    let author = document.getElementById("postAuthor").innerText
    let category = document.getElementById("postCategory").value
    ReadableAPI.submitPost(id, timestamp, title, body, author, category).then((res) => {
      let newpost = {id, timestamp, title, body, author, category}
      let oldposts = this.state.posts
      oldposts.push(newpost)
      this.setState({showNewPostForm : false, posts: oldposts})
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="siteTitle">Readable</h1>
        <Route exact path="/" render={() => (
          <ol className="categories">
            {this.state.showNewPostForm?
              <span>
                <NewPostField categories={this.state.categories} />
                <button className="formSubmit" onClick={this.addPost}>Submit</button>
                <button className="formCancel" onClick={this.closeForm}>Cancel</button>
              </span> :
              <button className="formShow" onClick={this.showForm}>+ Add New Post</button>
            }
            {this.state.categories.map(cat => (
              <li key={cat.name}>
                <Category catObj={cat}
                  name={cat.name}
                  posts={this.state.posts}
                />
              </li>
            ))}
          </ol>
        )} />
      <Route path="/details/:id" render={(props) => (
            <div className="details">
              <PostDetails {...props}/>
            </div>
        )} />
      </div>
    );
  }
}

const Category = (props) =>{
  return (
    <div className="Category">
      <h2 className="categoryName">{props.name.toUpperCase()}</h2>
      <ol className="posts">
        {props.posts.filter(p => (p.category === props.name)).map(post => (
          <li key={post.id}>
            <Post details={post} />
          </li>
        ))}
      </ol>
    </div>
  )
}

const NewPostField = (props) => {
  return (
    <div className="NewPostField">
      <span><b>Choose A Category:  </b></span>
      <select id="postCategory" placeholder="Select A Category...">
        {props.categories.map(cat => (
          <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <div contentEditable="true" className="titleInput" id="postTitle" placeholder="Enter witty title here" />
      <div contentEditable="true"className="authorInput" id="postAuthor" placeholder="Author" />
      <br/>
      <div contentEditable="true" className="bodyInput" placeholder="Enter the post body here..." id="postBody" />
    </div>
  )
}

export default App;
