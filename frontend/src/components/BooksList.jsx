import {useBooks} from '../hooks/index.js'

import BookListItem from './BookListItem.jsx'

export default function BooksList() {
    const {books} = useBooks()

    if (!books || books.length === 0) {
        return (
            <section className="px-48 py-16">
                <p>No books available yet.</p>
            </section>
        )
    }

    return (
        <section>
            <h2 className='text-primary-dark text-4xl mb-8'>Books</h2>
            <div className="flex flex-wrap justify-between gap-8">
                {books.map(book => (
                    <BookListItem
                        key={book.id}
                        title={book.title}
                        genre={book.genre}
                        author={book.author}
                        icon={book.icon}
                        price={book.price}
                        averageReviewScore={book.average_review_score}
                        numberOfReview={book.number_of_review}
                    />
                ))}
            </div>
        </section>
    )
}
