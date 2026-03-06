import Button from './Button.jsx'

export default function Filter() {
  return (
    <section className="">
      <h2 className="mb-8 text-4xl text-primary-dark">Filter</h2>
      <div className="flex max-w-56 flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <h4>Categories</h4>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="history"
                name="history"
                value="history"
                checked
              />
              <label htmlFor="History">All genres</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="history"
                name="history"
                value="history"
                checked
              />
              <label htmlFor="History">History</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="history"
                name="history"
                value="history"
                checked
              />
              <label htmlFor="History">Romance</label>
            </div>
          </div>
          <div>Book format</div>
          <div>Publisher</div>
          <div>Years</div>
          <div>Price range</div>
        </div>
        <div className="flex flex-col items-center gap-4 font-bold">
          <Button>Submit</Button>
          <Button>Search</Button>
        </div>
      </div>
    </section>
  )
}
