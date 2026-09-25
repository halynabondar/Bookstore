import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useBooks } from '../../hooks/index.js'
import Button from '../Button.jsx'

import BookListItem from './BookListItem.jsx'

const BOOKS_PER_PAGE = 9

export default function BooksList({ filters }) {
  const { books } = useBooks()
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE)

  useEffect(() => {
    setVisibleCount(BOOKS_PER_PAGE)
  }, [filters])

  if (!books || books.length === 0) {
    return (
      <section className="px-48 py-16">
        <p>No books available yet.</p>
      </section>
    )
  }

  const filteredBooks = books.filter(book => {
    const matchesGenre =
      filters.genre === 'all' ||
      book.genre.toLowerCase() === filters.genre.toLowerCase()

    const matchesBookFormat =
      filters.bookFormat === 'all' ||
      book.book_format?.toLowerCase() === filters.bookFormat.toLowerCase()

    const matchesPublisher =
      filters.publishers.length === 0 ||
      filters.publishers.includes(book.publisher)

    const year = book.publication_year

    const matchesYear =
      filters.year === 'all' ||
      (filters.year === '2020-2026' && year >= 2020 && year <= 2026) ||
      (filters.year === '2010-2019' && year >= 2010 && year <= 2019) ||
      (filters.year === '2000-2009' && year >= 2000 && year <= 2009) ||
      (filters.year === 'before-2000' && year < 2000)

    const price = Number(book.price)

    const matchesMinPrice =
      filters.minPrice === '' || price >= Number(filters.minPrice)

    const matchesMaxPrice =
      filters.maxPrice === '' || price <= Number(filters.maxPrice)

    return (
      matchesGenre &&
      matchesBookFormat &&
      matchesPublisher &&
      matchesYear &&
      matchesMinPrice &&
      matchesMaxPrice
    )
  })

  const visibleBooks = filteredBooks.slice(0, visibleCount)

  const handleShowMore = () => {
    setVisibleCount(prev => prev + BOOKS_PER_PAGE)
  }

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-4xl text-primary-dark">Books</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredBooks.length} books available
          </p>
        </div>

        <select className="rounded-lg border px-4 py-2 text-sm outline-none">
          <option>Newest</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
          <option>Rating</option>
        </select>
      </div>
      {filteredBooks.length === 0 ? (
        <p>No books found in this category</p>
      ) : (
        <>
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
        </>
      )}
      {visibleCount < filteredBooks.length && (
        <Button className="mt-10" onClick={handleShowMore}>
          Show more
        </Button>
      )}
    </section>
  )
}

BooksList.propTypes = {
  filters: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    bookFormat: PropTypes.string.isRequired,
    publishers: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired,
    minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
}
