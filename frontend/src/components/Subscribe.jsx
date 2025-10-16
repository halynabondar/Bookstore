export default function Subscribe() {
  return (
    <section className="flex h-60 bg-primary-light">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-evenly gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:justify-between lg:p-10">
        <h2 className="w-full text-3xl text-dark-100 md:text-4xl lg:w-1/2">
          Subscribe our newsletter for newest books updates
        </h2>
        <div className="flex w-full gap-4 lg:w-1/2 lg:justify-end">
          <input
            placeholder="Tape your e-mail here..."
            className="w-60 rounded-md border-0 sm:w-72"
          ></input>
          <button
            type="submit"
            className="rounded-md bg-primary-dark px-4 py-2 font-semibold text-dark-100 transition duration-300 hover:bg-dark-100 hover:text-primary-light"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  )
}
