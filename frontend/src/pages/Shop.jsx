import BooksList from '../components/BooksList.jsx'
import Filter from '../components/Filter.jsx'
import HeaderShop from '../components/HeaderShop.jsx'

export default function Shop() {
  return (
    <section className="">
      <div>
        <HeaderShop />
      </div>
      <div className="mx-auto max-w-7xl gap-16 px-4 py-6 sm:px-6 lg:p-10">
        {/*<Filter />*/}
        {/*<BooksList />*/}
      </div>
    </section>
  )
}
