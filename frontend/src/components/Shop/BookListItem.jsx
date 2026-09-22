import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default function BookListItem({
                                         id,
                                         title,
                                         genre,
                                         author,
                                         price,
                                         averageReviewScore,
                                         coverImage,
                                         numberOfReview,
                                     }) {
    return (
        <Link
            to={`/books/${id}`}
            className="group flex w-full cursor-pointer flex-col"
        >
            <div className="mb-3 overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={coverImage || '/books/bookCover.jpg'}
                    alt={title}
                    className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mb-2 flex items-center gap-2 text-xs">
                {averageReviewScore != null && (
                    <span>⭐ {averageReviewScore}</span>
                )}

                <span className="text-gray-500">
                    {numberOfReview} reviews
                </span>
            </div>

            <p className="mb-1 text-xs font-semibold uppercase text-primary-dark">
                {genre}
            </p>

            <h3 className="line-clamp-1 text-lg font-semibold">
                {title}
            </h3>

            <p className="text-sm text-gray-500">
                {author}
            </p>

            <p className="mt-3 font-semibold">
                {price} kr
            </p>
        </Link>
    )
}

BookListItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    coverImage: PropTypes.string.isRequired,
    averageReviewScore: PropTypes.number,
    numberOfReview: PropTypes.number,
}
