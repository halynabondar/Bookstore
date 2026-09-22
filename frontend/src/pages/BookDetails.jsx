import { useParams } from 'react-router-dom'

export default function BookDetails() {
  const { id } = useParams()

  return (
      <section className="p-20">
        <h1 className="text-4xl font-bold">
          Book Details
        </h1>

        <p>Book ID: {id}</p>
      </section>
  )
}