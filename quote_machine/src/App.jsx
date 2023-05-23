import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const API_URL = 'https://api.quotable.io/random'
  const [quote, setQuote] = useState({})
  const [color, setColor] = useState('')

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
    setColor('aqua')
  }, [])

  return (
    <>
      <div
        className='d-flex flex-column align-items-center justify-content-center h-100'
        style={{ backgroundColor: color }}
      >
        <div id='quote-box' className='container p-5'>
          <p id='text'>{quote.content}</p>
          <div className='d-flex justify-content-end'>
            <p id='author'>- {quote.author}</p>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <button
              id='new-quote'
              onClick={getNewQuote}
            >New Quote
            </button>
            <a
              href='https://twitter.com/intent/tweet'
              id='tweet-quote'
              target='_blank'
              rel='noreferrer'
            >Twitter
            </a>
          </div>
        </div>
        <p>Quotes provided by <a href='https://github.com/lukePeavey/quotable' target='_blank' rel='noreferrer'>Quotable API</a></p>
      </div>
    </>
  )
}

export default App
