export default function HeaderAbout() {
  return (
    <div className="w-full bg-secondary-light/60">
      <div className="mx-auto flex h-auto max-w-7xl flex-col items-start justify-center gap-4 px-4 py-8 sm:px-6 md:h-56 md:flex-row md:items-center md:gap-16 lg:px-10">
        <h1 className="w-full text-nowrap text-4xl md:w-1/2 md:text-5xl">
          About us
        </h1>
        <p className="flex w-full text-left text-lg md:w-1/2 md:text-right">
          At BookStore, we believe in the power of literature to transport us to
          new worlds, ignite our imagination, and inspire personal growth.
        </p>
      </div>
    </div>
  )
}
