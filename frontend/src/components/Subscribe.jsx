export default function Subscribe() {
  return (
    <section className="flex h-60 bg-primary-light">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-evenly gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:justify-between lg:p-10">
        <h2 className="w-full text-3xl text-dark-100 md:text-4xl lg:w-1/2">
          Subscribe our newsletter for newest books updates
        </h2>
        <form className="flex w-full max-w-lg">
          <input
            type="email"
            placeholder="Type your e-mail here..."
            className="min-w-0 flex-1 rounded-l-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="rounded-r-xl bg-primary-dark px-6 font-bold text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
