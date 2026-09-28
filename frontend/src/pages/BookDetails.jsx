import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ReviewForm from '../components/BookDetails/ReviewForm.jsx'
import Container from '../components/Container'
import StoreBenefits from '../components/Home/StoreBenefits.jsx'
import { useBooks, useCart } from '../hooks/index.js'

export default function BookDetails() {
  const { id } = useParams()
  const { books } = useBooks()
  const { addToCart } = useCart()

  const [book, setBook] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showAllReviews, setShowAllReviews] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
  }, [id])

  const relatedBooks = books
    .filter(item => item.id !== book?.id && item.genre === book?.genre)
    .slice(0, 2)

  if (!book) {
    return (
      <Container>
        <p className="py-16">Loading...</p>
      </Container>
    )
  }

  const reviewCount = book.reviews?.length || 0

  const averageRating = reviewCount
    ? (
        book.reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      ).toFixed(1)
    : 0

  const handleReviewAdded = newReview => {
    setBook(prevBook => ({
      ...prevBook,
      reviews: [...(prevBook.reviews || []), newReview],
    }))
  }

  const visibleReviews = showAllReviews
    ? book.reviews
    : book.reviews?.slice(0, 3)

  return (
    <section className="pt-10 lg:pt-16">
      <Container className="mb-12">
        <Link
          to="/shop"
          className="mb-8 inline-flex text-sm text-gray-500 transition hover:text-primary"
        >
          ← Back to shop
        </Link>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center rounded-2xl bg-gray-100 p-8">
            <img
              src={book.cover_image || '/books/bookCover.jpg'}
              alt={book.title}
              className="max-h-[600px] w-auto rounded-xl object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              {book.genre}
            </p>
            <h1 className="mb-3 text-4xl font-semibold leading-tight text-primary-dark lg:text-5xl">
              {book.title}
            </h1>
            <p className="mb-6 text-lg text-gray-500">by {book.author}</p>
            {book.description && (
              <p className="mb-6 max-w-xl leading-7 text-gray-600">
                {book.description}
              </p>
            )}
            <div className="mb-8 flex items-center gap-3">
              <span className="text-lg">⭐ {averageRating}</span>
              <span className="text-sm text-gray-500">
                {book.number_of_review} reviews
              </span>
            </div>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-primary-dark">
                {book.price}
              </span>
              <span className="text-lg font-medium text-gray-500">kr</span>
            </div>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="mb-2 text-sm text-gray-500">Quantity</p>
                <div className="flex h-12 items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="h-full px-4 text-lg text-gray-500 transition hover:bg-gray-100 hover:text-primary"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-medium text-primary-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="h-full px-4 text-lg text-gray-500 transition hover:bg-gray-100 hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(book, quantity)}
                className="h-12 rounded-lg bg-primary px-8 font-semibold text-white transition hover:opacity-90"
              >
                Add to cart
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              ✓ Available for purchase
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* LEFT */}
          <section className="flex flex-col">
            <h2 className="mb-6 text-2xl font-semibold text-primary-dark">
              Book details
            </h2>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Book title
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.title}
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Author
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.author}
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Genre
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.genre || '—'}
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Book format
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.book_format || '—'}
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Publisher
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.publisher || '—'}
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr]">
                <div className="bg-gray-100 px-5 py-4 text-sm font-medium text-primary-dark">
                  Publication year
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">
                  {book.publication_year || '—'}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside>
            <h2 className="mb-6 text-2xl font-semibold text-primary-dark">
              Related books
            </h2>

            <div className="space-y-4">
              {relatedBooks.map(relatedBook => (
                <Link
                  key={relatedBook.id}
                  to={`/books/${relatedBook.id}`}
                  className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-md"
                >
                  <img
                    src={relatedBook.cover_image || '/books/bookCover.jpg'}
                    alt={relatedBook.title}
                    className="h-28 w-20 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 py-1">
                    <p className="mb-1 line-clamp-2 text-sm font-semibold text-primary-dark group-hover:text-primary">
                      {relatedBook.title}
                    </p>

                    <p className="mb-3 line-clamp-1 text-xs text-gray-500">
                      {relatedBook.author}
                    </p>

                    <p className="text-sm font-semibold text-primary">
                      {relatedBook.price} kr
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/shop"
              className="mt-5 inline-flex text-sm font-semibold text-primary transition hover:opacity-70"
            >
              View more books →
            </Link>
          </aside>
        </div>
        <section className="mt-16 border-t border-gray-200 pt-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-primary-dark">
                Customer Reviews
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                See what other readers think about this book.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div>
              <div className="grid gap-10 sm:grid-cols-[180px_1fr]">
                {/* Rating summary */}
                <div>
                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      <p className="text-5xl font-semibold leading-none text-primary-dark">
                        {averageRating}
                      </p>

                      <span className="pb-1 text-sm text-gray-400">/ 5</span>
                    </div>

                    <div className="mt-3 text-lg text-yellow-500">★★★★★</div>

                    <p className="mt-2 text-sm text-gray-500">
                      Based on {reviewCount} reviews
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count =
                        book.reviews?.filter(review => review.rating === rating)
                          .length || 0

                      const percentage = reviewCount
                        ? (count / reviewCount) * 100
                        : 0

                      return (
                        <div
                          key={rating}
                          className="grid grid-cols-[20px_1fr_20px] items-center gap-2"
                        >
                          <span className="text-xs text-gray-500">
                            {rating}
                          </span>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <span className="text-right text-xs text-gray-400">
                            {count}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  {book.reviews?.length ? (
                    <>
                      <div className="divide-y divide-gray-200">
                        {visibleReviews.map(review => (
                          <article key={review.id} className="py-6 first:pt-0">
                            <div className="mb-3 flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-primary-dark">
                                  {review.author_name}
                                </h3>

                                <div className="mt-1 text-sm text-yellow-500">
                                  {'★'.repeat(review.rating)}

                                  <span className="text-gray-300">
                                    {'★'.repeat(5 - review.rating)}
                                  </span>
                                </div>
                              </div>

                              <time className="shrink-0 text-xs text-gray-400">
                                {new Date(
                                  review.created_at
                                ).toLocaleDateString()}
                              </time>
                            </div>

                            <p className="leading-7 text-gray-600">
                              {review.comment}
                            </p>
                          </article>
                        ))}
                      </div>

                      {book.reviews.length > 3 && (
                        <button
                          type="button"
                          onClick={() => setShowAllReviews(prev => !prev)}
                          className="mt-6 font-semibold text-primary transition hover:opacity-70"
                        >
                          {showAllReviews
                            ? 'Show less'
                            : `Show all reviews (${book.reviews.length})`}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500">
                      No reviews yet. Be the first to write one.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Write review */}
            <ReviewForm bookId={book.id} onReviewAdded={handleReviewAdded} />
          </div>
        </section>
      </Container>
      <StoreBenefits />
    </section>
  )
}
