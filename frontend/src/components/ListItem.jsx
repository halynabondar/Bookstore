import PropTypes from 'prop-types'

export default function ListItem({ item }) {
  return <li className="cursor-pointer">{item}</li>
}

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
}
