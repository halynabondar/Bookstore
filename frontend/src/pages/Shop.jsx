import { useState } from 'react'

import Container from '../components/Container.jsx'
import HeaderShop from '../components/HeaderShop.jsx'
import BooksList from '../components/Shop/BooksList.jsx'
import Filter from '../components/Shop/Filter.jsx'

const initialFilters = {
  genre: 'all',
  bookFormat: 'all',
  publishers: [],
  year: 'all',
  minPrice: '',
  maxPrice: '',
}

export default function Shop() {
  const [draftFilters, setDraftFilters] = useState(initialFilters)
  const [filters, setFilters] = useState(initialFilters)

  const handleApplyFilters = () => {
    setFilters(draftFilters)
  }

  const handleResetFilters = () => {
    setDraftFilters(initialFilters)
    setFilters(initialFilters)
  }

  return (
    <>
      <HeaderShop />
      <main className="py-6 lg:py-10">
        <Container>
          <div className="grid grid-cols-4 gap-16">
            <div className="col-span-1 border-r border-gray-200 pr-10">
              <Filter
                filters={draftFilters}
                onFiltersChange={setDraftFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            </div>

            <div className="col-span-3">
              <BooksList filters={filters} />
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
