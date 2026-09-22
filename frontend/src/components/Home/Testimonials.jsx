import TestimonialCard from './TestimonialCard.jsx'

const testimonials = [
  {
    id: 1,
    author: 'Emma Johnson',
    review:
      'A wonderful selection of books and a great shopping experience. I always find something new to add to my reading list.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Daniel Wilson',
    review:
      'The website is easy to use, and my order arrived quickly and in perfect condition. I will definitely shop here again.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Sophie Martin',
    review:
      'I love discovering new books here. The collection has something for every mood and makes choosing my next read so easy.',
    rating: 5,
  },
  {
    id: 4,
    author: 'Michael Brown',
    review:
      'Great service, a lovely selection of books, and a smooth ordering process from start to finish. Highly recommended!',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Loved by Readers
        </h2>

        <p className="mx-auto max-w-md pt-2 text-center">
          Real stories from readers who found inspiration, knowledge, and their
          next favorite book with us.
        </p>

        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
