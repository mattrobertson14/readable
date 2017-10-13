import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import Post from './Post.js'
import { PostDetails } from './Post.js'

let categories = [{name: "React"}, {name: "React-Router"}, {name: "React-Redux"}, {name: "Party"}]

let posts = [
  {voteScore: 1, title: "Good Practice", author: "Jimmy",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", category: "React", id: "00001"},
  {voteScore: 3, title: "Best Framework Ever!", author: "Steve",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", category: "React", id: "00002"},
  {voteScore: 1, title: "You have to use this tool!", author: "Jack",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", category: "React-Router", id: "00003"},
  {voteScore: 4, title: "Manage your state like never before", author: "Matt",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", category: "React-Redux", id: "00004"},
  {voteScore: 1, title: "Everyone is invited!", author: "Party Patty",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", category: "Party", id: "00005"}]

let comments = []

class App extends Component {
  state = {
    showNewPostForm: false
  }

  showForm = () => {
    this.setState({showNewPostForm : true })
  }

  render() {

      console.log(JSON.stringify(categories))
    return (
      <div className="App">
        <h1 className="siteTitle">Readable</h1>
        <Route exact path="/" render={() => (
          <ol className="categories">
            {categories.map(cat => (
              <li key={cat.name}>
                <Category name={cat.name} showForm={this.showForm} showPostForm={this.state.showNewPostForm}/>
              </li>
            ))}
          </ol>
        )} />
        <Route path="/details" render={() => (
            <div className="details">
              <PostDetails />
            </div>
        )} />
      </div>
    );
  }
}

const Category = (props) =>{
  return (
    <div className="Category">
      <h2 className="categoryName">{props.name}</h2>
      {props.showPostForm? <NewPostField /> :
        <button onClick={props.showForm}>Add New Post</button>
      }
      <ol className="posts">
        {posts.filter(p => (p.category === props.name)).map(post => (
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
      <div contentEditable="true" className="titleInput" id="title" placeholder="Enter witty title here" />
      <div contentEditable="true"className="authorInput" id="author" placeholder="Author" />
      <br/>
      <div contentEditable="true" className="bodyInput" placeholder="Enter the post body here..." id="body" />
    </div>
  )
}

export default App;
