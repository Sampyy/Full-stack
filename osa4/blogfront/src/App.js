import { useState, useEffect } from 'react';
import './App.css';
import blogs from './services/blogs'
import BlogForm from './components/BlogForm'



const App = () => {
  
  const [blogs, setBlogs] = useState([ 
  {author:'auto',
  title:'on se',
  url:'jep',
  votes:5},
  {author:'auto',
  title:'on se',
  url:'jep',
  votes:5},
  {author:'auto',
  title:'on se',
  url:'jep',
  votes:5}])
  const [newAuthor, setNewAuthor] = useState('auth')
  const [newTitle, setNewTitle] = useState('tit')
  const [newUrl, setNewUrl] = useState('ura')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    votes:0,
    }
    //creating in backend

    setBlogs(blogs.concat(newBlog))
  }

  const handleAuthor = event => setNewAuthor(event.target.value)
  const handleTitle = event => setNewTitle(event.target.value)
  const handleUrl = event => setNewUrl(event.target.value)


  return (
    <div className="App">
      <header className="Blogit">
        <h3>add a new blog</h3>
        {console.log('url' + newUrl + ' author ' + newAuthor + ' title '+ newTitle)}
        <BlogForm newAuthor = {newAuthor} handleAuthor={handleAuthor} newTitle = {newTitle} handleTitle={handleTitle} url = {newUrl} handleUrl={handleUrl} addBlog={addBlog}></BlogForm>
        <ul>
          {blogs.map((value, index) => {
            return <li key={index}>{value.author} {value.title} {value.url} {value.votes}</li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
