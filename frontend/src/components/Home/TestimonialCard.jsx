import PropTypes from 'prop-types'

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow-lg">
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>

      <p className="text-dark-500">{testimonial.review}</p>

      <h3 className="pt-2 font-bold text-dark-600">{testimonial.author}</h3>
    </div>
  )
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
}
