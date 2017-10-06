import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Post from './Post.js'
import { PostDetails } from './Post.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="siteTitle">Readable</h1>
        <Route exact path="/" render={() => (
          <div className="categories">
            <Category />
            <Category />
            <Category />
          </div>
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
    <div className="category">
      <h2 className="categoryName">Category Name</h2>
      <Post />
    </div>
  )
}

export default App;
