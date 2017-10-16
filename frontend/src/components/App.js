import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import Post from './Post.js'
import PostDetails from './PostDetails.js'
import * as ReadableAPI from '../ReadableAPI.js'

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
    this.setState({showNewPostForm : true })
  }

  render() {
    return (
      <div className="App">
        <h1 className="siteTitle">Readable</h1>
        <Route exact path="/" render={() => (
          <ol className="categories">
            {this.state.categories.map(cat => (
              <li key={cat.name}>
                <Category catObj={cat}
                  name={cat.name}
                  showForm={this.showForm}
                  showPostForm={this.state.showNewPostForm}
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
      {props.showPostForm? <NewPostField /> :
        <button onClick={props.showForm}>Add New Post</button>
      }
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
      <div contentEditable="true" className="titleInput" id="title" placeholder="Enter witty title here" />
      <div contentEditable="true"className="authorInput" id="author" placeholder="Author" />
      <br/>
      <div contentEditable="true" className="bodyInput" placeholder="Enter the post body here..." id="body" />
    </div>
  )
}

export default App;
