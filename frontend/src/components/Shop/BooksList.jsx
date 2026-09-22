import { useState } from 'react'

import { useBooks } from '../../hooks/index.js'
import Button from '../Button.jsx'

import BookListItem from './BookListItem.jsx'

const BOOKS_PER_PAGE = 9

export default function BooksList() {
  const { books } = useBooks()
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE)

  if (!books || books.length === 0) {
    return (
      <section className="px-48 py-16">
        <p>No books available yet.</p>
      </section>
    )
  }

  const visibleBooks = books.slice(0, visibleCount)

  const handleShowMore = () => {
    setVisibleCount(prev => prev + BOOKS_PER_PAGE)
  }

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-4xl text-primary-dark">Books</h2>

          <p className="mt-1 text-sm text-gray-500">
            {books.length} books available
          </p>
        </div>

        <select className="rounded-lg border px-4 py-2 text-sm outline-none">
          <option>Newest</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
          <option>Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
        {visibleBooks.map(book => (
          <BookListItem
            key={book.id}
            id={book.id}
            title={book.title}
            genre={book.genre}
            author={book.author}
            coverImage={book.cover_image}
            price={book.price}
            averageReviewScore={book.average_review_score}
            numberOfReview={book.number_of_review}
          />
        ))}
      </div>
      {visibleCount < books.length && (
        <Button className="mt-10" onClick={handleShowMore}>
          Show more
        </Button>
      )}
    </section>
  )
}
