import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import { useUser } from '../hooks/index.js'

import Loading from './Loading.jsx'

export default function RequireAuth({ children }) {
  const { user, initializing } = useUser()
  const location = useLocation()

  if (initializing) return <Loading />

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
}
