import PropTypes from 'prop-types'

export default function FormMessage({ message }) {
  if (!message) return null

  const isError =
    message.startsWith('❌') ||
    message.startsWith('⚠️') ||
    message.toLowerCase().includes('error')

  return (
    <p
      className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-600'}`}
    >
      {message}
    </p>
  )
}

FormMessage.propTypes = {
  message: PropTypes.string,
}
