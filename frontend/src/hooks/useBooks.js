import { useContext } from 'react'

import { BooksContext } from '../context/index.js'

export function useBooks() {
  return useContext(BooksContext)
}
