import { useState } from 'react';
import './App.css';



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


  return (
    <div className="App">
      <header className="Blogit">
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
