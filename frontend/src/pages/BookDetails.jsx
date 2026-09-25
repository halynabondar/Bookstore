import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Container from '../components/Container'
import StoreBenefits from '../components/Home/StoreBenefits.jsx'
import { useBooks } from '../hooks/index.js'

export default function BookDetails() {
  const { id } = useParams()
  const { books } = useBooks()
  const [quantity, setQuantity] = useState(1)

  const book = books?.find(book => String(book.id) === id)

  const relatedBooks = books
    ?.filter(item => item.id !== book?.id && item.genre === book?.genre)
    .slice(0, 4)

  if (!book) {
    return (
      <Container>
        <p className="py-16">Loading...</p>
      </Container>
    )
  }

  if (!book) {
    return (
      <Container>
        <div className="py-16">
          <h1 className="mb-4 text-3xl font-semibold">Book not found</h1>

          <Link to="/shop" className="text-primary hover:underline">
            Back to shop
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <section className="py-10 lg:py-16">
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
              <span className="text-lg">⭐ {book.average_review_score}</span>
              <span className="text-sm text-gray-500">
                {book.number_of_review} reviews
              </span>
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-500">Price</p>
              <p className="text-3xl font-semibold text-primary-dark">
                {book.price} kr
              </p>
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
          <section>
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
          </aside>
        </div>
      </Container>
      <StoreBenefits />
    </section>
  )
}
