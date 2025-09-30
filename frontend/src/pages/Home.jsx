import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <img
        className="absolute inset-0 size-full object-cover"
        src="/main/hero4.webp"
        alt="Book"
      />

      {/* Overlay with text */}
      <div className="absolute inset-0 flex items-center justify-start bg-black/40">
        <div className="ml-12 flex max-w-xl flex-col gap-y-6 px-8 text-left">
          <h3 className="self-start rounded-xl bg-dark-600 px-4 py-2 uppercase text-textc-onDark">
            Special offer
          </h3>
          <h1 className="max-w-7xl text-4xl font-bold text-white md:text-5xl">
            There is nothing better than to read a book.
          </h1>
          <p className="text-xl text-white md:text-2xl">
            Find the best books for you.
          </p>
          <button
            onClick={() => navigate('/books')}
            className="mt-4 flex items-center gap-2 self-start rounded-2xl bg-primary-dark px-6 py-2 text-white transition duration-300 hover:bg-primary-light"
          >
            Shop now <AutoStoriesIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
