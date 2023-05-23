import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { gsap } from 'gsap'
import './App.css'

function App () {
  const API_URL = 'https://api.quotable.io/random'
  const [quote, setQuote] = useState({})
  const [color, setColor] = useState('')

  const backgroundRef = useRef(null)
  const quoteTextRef = useRef(null)
  const buttonRef = useRef(null)
  const twitterRef = useRef(null)

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
    setTimeout(() => {
      axios.get(API_URL)
        .then(response => {
          setQuote(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, 400)
    setColor(getRandomColor(colorPallete))
  }

  useEffect(() => {
    getNewQuote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(quoteTextRef.current, {
      opacity: 1
    }, {
      duration: 0.5,
      ease: 'none',
      color,
      opacity: 0
    })
      .fromTo(quoteTextRef.current, {
        opacity: 0
      }, {
        duration: 0.5,
        ease: 'none',
        color,
        opacity: 1
      })
    gsap.to(backgroundRef.current, {
      duration: 1,
      ease: 'none',
      backgroundColor: color
    })
    gsap.to(buttonRef.current, {
      duration: 0.5,
      ease: 'none',
      backgroundColor: color
    })
    gsap.to(twitterRef.current, {
      duration: 1,
      ease: 'none',
      color
    })
  }, [color])

  return (
    <>
      <div
        ref={backgroundRef}
        className='d-flex flex-column align-items-center justify-content-center h-100'
      >
        <div id='quote-box' className='container p-5 mb-2'>
          <div ref={quoteTextRef}>
            <h3
              id='text'
            >{quote.content}
            </h3>
            <div className='d-flex justify-content-end'>
              <h5
                id='author'
              >- {quote.author}
              </h5>
            </div>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <button
              ref={buttonRef}
              id='new-quote'
              className='btn'
              onClick={getNewQuote}
              style={{ color: 'white' }}
            >New Quote
            </button>
            <a
              href='https://twitter.com/intent/tweet'
              id='tweet-quote'
              target='_blank'
              rel='noreferrer'
            >
              <i
                ref={twitterRef}
                className='bi bi-twitter fs-2'
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
