import { useState, useEffect } from 'react';
import './App.css';
import blogs from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'



const App = () => {
  
  const [blog, setBlogs] = useState([ 
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: 0,
    }

    blogs.create(newBlog)
    //creating in backend
    if (newTitle !== undefined && newUrl !== undefined) {
      setBlogs(blog.concat(newBlog))
    }
  }

  const handleDelete = (id) => {
    blogs.deleteId(id)
    blogs.getAll().then(res => {
      setBlogs(blog.filter(blog => blog.id !== id))
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  const addLikes = id => {
    const blogForId = blog.find(b => b.id === id)
    const newBlog = {...blogForId, likes: blogForId.likes++}

    console.log(newBlog)

    blogs.update(id, newBlog).then(response => {
      setBlogs(blog.map(b => b.id !== id ? b : response))
    })
    .catch(exception => console.log(exception))
  }
  

  const hook = () => {
    blogs.getAll().then(response => setBlogs(response))
  }

  //useEffect(hook, [])

  const handleAuthor = event => setNewAuthor(event.target.value)
  const handleTitle = event => setNewTitle(event.target.value)
  const handleUrl = event => setNewUrl(event.target.value)


  return (
    <div className="App">
      <header className="Blogit">
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
        <h3>add a new blog</h3>
        {console.log('url' + newUrl + ' author ' + newAuthor + ' title '+ newTitle)}
        <BlogForm newAuthor = {newAuthor} handleAuthor={handleAuthor} newTitle = {newTitle} handleTitle={handleTitle} url = {newUrl} handleUrl={handleUrl} addBlog={addBlog}></BlogForm>
        <ul>
          {blog.map(blog => {
            return <li key={blog.title}>{blog.author} {blog.title} {blog.url} {blog.likes || 0}
              <button onClick={() => addLikes(blog.id)}>Like</button>
              <button onClick={() => handleDelete(blog.id)}>Delete</button></li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
