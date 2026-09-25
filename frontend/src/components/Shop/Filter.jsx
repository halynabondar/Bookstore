import {useState} from 'react'
import PropTypes from 'prop-types'

import Button from '../Button.jsx'

import {filterActions, filterSections, filterTitle} from './Filters.js'

function FilterSection({title, options = [], value, onChange, defaultOpen = false}) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <section>
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="flex w-full items-center justify-between py-2 text-left"
                aria-expanded={isOpen}>
                <h4 className="text-lg font-medium text-primary-dark">{title}</h4>
                <span
                    className={`text-xl transition-transform duration-200 ${
                        isOpen ? 'rotate-90' : ''
                    }`}
                >
          ›
        </span>
            </button>
            {isOpen && (
                <div className="flex flex-col gap-2">
                    {options.map(option => (
                        <label
                            key={option.id}
                            htmlFor={option.id}
                            className="flex items-center gap-2 text-sm text-dark-600"
                        >
                            <input
                                type={option.type}
                                id={option.id}
                                name={option.name}
                                value={option.value}
                                checked={
                                    option.type === 'checkbox' ? value.includes(option.value) : value === option.value
                                }
                                onChange={onChange}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </section>
    )
}

FilterSection.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['radio', 'checkbox']),
        })
    ),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    onChange: PropTypes.func,
    defaultOpen: PropTypes.bool,
}

function PriceRange({minPrice, maxPrice, onChange}) {
    const min = minPrice === '' ? 0 : Number(minPrice)
    const max = maxPrice === '' ? 50 : Number(maxPrice)

    const handleMinChange = event => {
        const value = Math.min(Number(event.target.value), max - 1)
        onChange('minPrice', value)
    }

    const handleMaxChange = event => {
        const value = Math.max(Number(event.target.value), min + 1)
        onChange('maxPrice', value)
    }

    return (
        <div className="mt-2">
            <div className="mb-3 flex justify-between text-sm text-dark-600">
                <span>{min} kr</span>
                <span>{max} kr</span>
            </div>

            <div className="relative h-6">
                <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-gray-300"/>

                <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-primary"
                    style={{
                        left: `${(min / 50) * 100}%`,
                        right: `${100 - (max / 50) * 100}%`,
                    }}
                />

                <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={min}
                    onChange={handleMinChange}
                    className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />

                <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={max}
                    onChange={handleMaxChange}
                    className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
            </div>
        </div>
    )
}

PriceRange.propTypes = {
    minPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    maxPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func.isRequired,
}

export default function Filter({
                                   title = filterTitle,
                                   sections = filterSections,
                                   actions = filterActions,
                                   filters,
                                   onFiltersChange,
                                   onApply,
                                   onReset
                               }) {

    function handleChange(filterName, value) {
        onFiltersChange(prev => ({
            ...prev,
            [filterName]: value,
        }));
    }

    function handlePublisherChange(publisher) {
        onFiltersChange(prev => {
            const isSelected = prev.publishers.includes(publisher)

            return {
                ...prev,
                publishers: isSelected
                    ? prev.publishers.filter(item => item !== publisher)
                    : [...prev.publishers, publisher],
            }
        })
    }

    return (
        <section>
            <h2 className="mb-8 text-4xl text-primary-dark">{title}</h2>
            <div className="flex max-w-64 flex-col gap-6">
                <div className="flex flex-col gap-4">
                    {sections.map(section => {
                        const isCategory = section.id === 'categories'
                        const isBookFormat = section.id === 'book-format'
                        const isPublisher = section.id === 'publisher'
                        const isYear = section.id === 'years'
                        const isPriceRange = section.id === 'price-range'

                        if (isPriceRange) {
                            return (
                                <section key={section.id}>
                                    <h4 className="py-2 text-lg font-medium text-primary-dark">
                                        {section.title}
                                    </h4>

                                    <PriceRange
                                        minPrice={filters.minPrice}
                                        maxPrice={filters.maxPrice}
                                        onChange={handleChange}
                                    />
                                </section>
                            )
                        }

                        return (
                            <FilterSection
                                key={section.id}
                                title={section.title}
                                options={section.options}
                                value={
                                    isCategory
                                        ? filters.genre
                                        : isBookFormat
                                            ? filters.bookFormat
                                            : isPublisher
                                                ? filters.publishers
                                                : isYear
                                                    ? filters.year
                                                    : undefined
                                }
                                onChange={
                                    isCategory
                                        ? event => handleChange('genre', event.target.value)
                                        : isBookFormat
                                            ? event => handleChange('bookFormat', event.target.value)
                                            : isPublisher
                                                ? event => handlePublisherChange(event.target.value)
                                                : isYear
                                                    ? event => handleChange('year', event.target.value)
                                                    : undefined
                                }
                                defaultOpen={[
                                    'categories',
                                    'book-format',
                                    'price-range',
                                ].includes(section.id)}
                            />
                        )
                    })}
                </div>
                <div className="flex w-full flex-col gap-4">
                    {actions.map(action => (
                        <Button
                            key={action.id}
                            type={action.type}
                            onClick={
                                action.id === 'apply-filter'
                                    ? onApply
                                    : action.id === 'reset-filter'
                                        ? onReset
                                        : undefined
                            }
                            className={
                                action.id === 'apply-filter'
                                    ? 'w-full bg-primary text-white duration-300 transition-all hover:bg-primary-dark'
                                    : 'w-full border border-primary bg-white text-primary transition-all duration-300 hover:bg-primary-light hover:text-dark-100'
                            }
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}

Filter.propTypes = {
    title: PropTypes.string,
    filters: PropTypes.shape({
        genre: PropTypes.string.isRequired,
        bookFormat: PropTypes.string.isRequired,
        publishers: PropTypes.arrayOf(PropTypes.string).isRequired,
        year: PropTypes.string.isRequired,
        minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,

    onFiltersChange: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    type: PropTypes.oneOf(['radio', 'checkbox']),
                })
            ),
        })
    ),

    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string,
        })
    ),
}
