import HeaderShop from '../components/HeaderShop.jsx'
import BooksList from '../components/Shop/BooksList.jsx'
import Filter from '../components/Shop/Filter.jsx'

export default function Shop() {
  return (
    <section className="">
      <div>
        <HeaderShop />
      </div>
      <div className="mx-auto grid grid-cols-4 gap-16 px-4 py-6 sm:px-6 lg:p-10">
        <div className="col-span-1">
          <Filter />
        </div>
        <div className="col-span-3">
          <BooksList />
        </div>
      </div>
    </section>
  )
}
