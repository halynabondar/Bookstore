import PropTypes from 'prop-types'

export default function BookListItem({
  title,
  genre,
  author,
  price,
  averageReviewScore,
  numberOfReview,
}) {
  return (
    <div className="flex h-96 w-72 flex-col rounded-xl">
      <img
        src="../../public/books/bookCover.jpg"
        alt={title}
        className="mb-2 size-full rounded-md object-cover"
      />
      <div className="flex gap-2 text-sm">
        {averageReviewScore != null && <span>⭐ {averageReviewScore}</span>}
        {numberOfReview != null && <span>({numberOfReview} reviews)</span>}
      </div>
      <p className="mt-2 text-xs uppercase text-gray-600">{genre}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-700">{author}</p>
      <p className="mt-auto text-sm font-semibold">{price} kr</p>
    </div>
  )
}

BookListItem.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  averageReviewScore: PropTypes.number.isRequired,
  numberOfReview: PropTypes.number.isRequired,
}
