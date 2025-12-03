import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { BooksContext } from './BooksContext'

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [])

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  )
}

BooksProvider.propTypes = {
  children: PropTypes.node,
}
