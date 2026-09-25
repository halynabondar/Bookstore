import PropTypes from 'prop-types'
import { useState } from 'react'

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: low to high' },
    { value: 'price-high', label: 'Price: high to low' },
    { value: 'rating', label: 'Rating' },
  ]

  const selectedOption = options.find(option => option.value === value)

  const handleSelect = optionValue => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative w-52">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-primary-dark shadow-sm transition hover:border-primary focus:border-primary focus:outline-none"
      >
        <span>{selectedOption?.label}</span>
        <span
          className={`ml-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-lg">
          {options.map(option => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                  isSelected
                    ? 'bg-primary/10 font-medium text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-dark'
                } `}
              >
                <span>{option.label}</span>

                {isSelected && <span className="text-primary">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

SortDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
