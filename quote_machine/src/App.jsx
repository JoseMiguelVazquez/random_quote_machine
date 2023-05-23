import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const API_URL = 'https://api.quotable.io/random'
  const [quote, setQuote] = useState({})

  const getNewQuote = () => {
    axios.get(API_URL)
      .then(response => {
        setQuote(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getNewQuote()
  }, [])

  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center h-100'>
        <div id='quote-box' className='container'>
          <p id='text'>{quote.content}</p>
          <p id='author'>{quote.author}</p>
          <button
            id='new-quote'
            onClick={getNewQuote}
          >New Quote
          </button>
          <a
            href='twitter.com/intent/tweet'
            id='tweet-quote'
            target='_blank'
          >Twitter
          </a>
        </div>
        <p>Quotes provided by <a href='https://github.com/lukePeavey/quotable' target='_blank' rel='noreferrer'>Quotable API</a></p>
      </div>
    </>
  )
}

export default App
