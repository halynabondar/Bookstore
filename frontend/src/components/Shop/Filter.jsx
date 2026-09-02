import PropTypes from 'prop-types'

import Button from '../Button.jsx'

import { filterActions, filterSections, filterTitle } from './Filters.js'

function FilterSection({ title, options = [] }) {
  return (
    <div>
      <h4 className="mb-3 text-lg font-medium text-primary-dark">{title}</h4>
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
              defaultChecked={option.checked}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
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
      checked: PropTypes.bool,
    })
  ),
}

export default function Filter({
  title = filterTitle,
  sections = filterSections,
  actions = filterActions,
}) {
  return (
    <section>
      <h2 className="mb-8 text-4xl text-primary-dark">{title}</h2>
      <div className="flex max-w-56 flex-col gap-4">
        <div className="flex flex-col gap-4">
          {sections.map(section => (
            <FilterSection
              key={section.id}
              title={section.title}
              options={section.options}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          {actions.map(action => (
            <Button key={action.id} type={action.type}>
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
          checked: PropTypes.bool,
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
