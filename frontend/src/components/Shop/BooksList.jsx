import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useBooks } from '../../hooks/index.js'
import Button from '../Button.jsx'

import BookListItem from './BookListItem.jsx'
import SortDropdown from './SortDropdown.jsx'

const BOOKS_PER_PAGE = 9

export default function BooksList({ filters }) {
  const { books } = useBooks()
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE)
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    setVisibleCount(BOOKS_PER_PAGE)
  }, [filters, sortBy])

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

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Number(a.price) - Number(b.price)

      case 'price-high':
        return Number(b.price) - Number(a.price)

      case 'rating':
        return Number(b.average_review_score) - Number(a.average_review_score)

      case 'newest':
        return new Date(b.publication_date) - new Date(a.publication_date)
    }
  })

  const visibleBooks = sortedBooks.slice(0, visibleCount)

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
        <SortDropdown value={sortBy} onChange={setSortBy} />
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
