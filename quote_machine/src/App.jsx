import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const API_URL = 'https://api.quotable.io/random'
  const [quote, setQuote] = useState({})
  const [color, setColor] = useState('')

  const colorPallete = [
    '#0A4D68',
    '#088395',
    '#05BFDB',
    '#00FFCA',
    '#068DA9',
    '#7E1717',
    '#E55807',
    '#4C4C6D',
    '#1B9C85',
    '#1F8A70',
    '#39B5E0',
    '#9C254D',
    '#482121',
    '#47A992',
    '#E57C23',
    '#643843',
    '#99627A',
    '#1D267D'
  ]

  const getRandomColor = (colorArray) => {
    const randomIndex = Math.floor(Math.random() * colorArray.length)
    const randomColor = colorArray[randomIndex]
    return randomColor
  }

  const getNewQuote = () => {
    axios.get(API_URL)
      .then(response => {
        setQuote(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    setColor(getRandomColor(colorPallete))
  }

  useEffect(() => {
    getNewQuote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        className='d-flex flex-column align-items-center justify-content-center h-100'
        style={{ backgroundColor: color }}
      >
        <div id='quote-box' className='container p-5 mb-2'>
          <h3
            id='text'
            style={{ color }}
          >{quote.content}
          </h3>
          <div className='d-flex justify-content-end'>
            <h5
              id='author'
              style={{ color }}
            >- {quote.author}
            </h5>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <button
              id='new-quote'
              className='btn'
              onClick={getNewQuote}
              style={{ backgroundColor: color, color: 'white' }}
            >New Quote
            </button>
            <a
              href='https://twitter.com/intent/tweet'
              id='tweet-quote'
              target='_blank'
              rel='noreferrer'
            >
              <i
                className='bi bi-twitter fs-2'
                style={{ color }}
              />
            </a>
          </div>
        </div>
        <p className='quotes-provided-by'>Quotes provided by
          <span> </span>
          <a
            href='https://github.com/lukePeavey/quotable'
            target='_blank'
            rel='noreferrer'
          >
            Quotable API
          </a>
        </p>
      </div>
    </>
  )
}

export default App
