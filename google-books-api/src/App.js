import './App.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';

function App() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
      .then(data => {
        setResult(data.data.items)
      })
  }

  function handleChange(e){
      const book = e.target.value
      setBook(book)
  }


  return (
    <div className="container">
        <h1>Book Search - Use Google Books API</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input onChange={handleChange} type="text" className="form-control mt-10" placeholder="Serach for books" autoComplete="off"/>

          </div>
          <button type="submit" className="btn btn-danger">Search</button>
        </form>

        {result.map(book => (
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
          </a>
        ))}

      </div>

  );
}

export default App;
