import PropTypes from 'prop-types'

export default function BookListItem({
  title,
  genre,
  author,
  price,
  averageReviewScore,
  // numberOfReview,
}) {
  return (
    <div className="box-border flex h-96 w-72 cursor-pointer flex-col rounded-xl p-4 shadow-md transition duration-300 hover:shadow-lg">
      <div className="mb-2 flex justify-between">
        <div className="flex gap-2 text-sm">
          {averageReviewScore != null && <span>⭐ {averageReviewScore}</span>}
          {/*{numberOfReview != null && <span>({numberOfReview} reviews)</span>}*/}
        </div>
        <p className="text-xs uppercase text-gray-600">{genre}</p>
      </div>
      <img
        src="../../public/books/bookCover.jpg"
        alt={title}
        className="mb-2 h-60 w-full rounded-md object-contain"
      />
      <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
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
  // numberOfReview: PropTypes.number.isRequired,
}
