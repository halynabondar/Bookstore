import PropTypes from 'prop-types'
import { useState } from 'react'

export default function ReviewForm({ bookId, onReviewAdded }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setSuccessMessage('')

    if (!rating) {
      setError('Please select a rating.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${bookId}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            review: {
              rating,
              author_name: authorName,
              comment,
            },
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.errors?.join(', ') || 'Something went wrong.')
        return
      }

      onReviewAdded(data)

      setRating(0)
      setHoveredRating(0)
      setAuthorName('')
      setComment('')
      setSuccessMessage('Thank you! Your review has been submitted.')
    } catch {
      setError('Could not submit review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:p-7"
    >
      <h3 className="mb-6 text-xl font-semibold text-primary-dark">
        Write a review
      </h3>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-primary-dark">
          Your rating
        </p>

        <div
          className="flex w-fit gap-1"
          onMouseLeave={() => setHoveredRating(0)}
        >
          {[1, 2, 3, 4, 5].map(star => {
            const isActive = star <= (hoveredRating || rating)

            return (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onClick={() => {
                  setRating(star)
                  setSuccessMessage('')
                }}
                className={`text-2xl transition duration-150 ${
                  isActive ? 'scale-110 text-yellow-500' : 'text-gray-300'
                }`}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="authorName"
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          Your name
        </label>

        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={event => {
            setAuthorName(event.target.value)
            setSuccessMessage('')
          }}
          required
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="reviewComment"
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          Your review
        </label>

        <textarea
          id="reviewComment"
          value={comment}
          onChange={event => {
            setComment(event.target.value)
            setSuccessMessage('')
          }}
          required
          rows={5}
          placeholder="What did you think about this book?"
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
        />
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {successMessage && (
        <div className="mb-5 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary-dark">
          ✓ {successMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit review'}
      </button>
    </form>
  )
}

ReviewForm.propTypes = {
  bookId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onReviewAdded: PropTypes.func.isRequired,
}
