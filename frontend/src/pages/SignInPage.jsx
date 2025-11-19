import { Navigate, useLocation } from 'react-router-dom'

import SignInForm from '../components/SignInForm.jsx'
import { useUser } from '../hooks/index.js'

export default function SignInPage() {
  const { user, initializing } = useUser()
  const location = useLocation()

  if (initializing) return null

  if (user) {
    const redirectTo = location.state?.from?.pathname || '/profile'
    return <Navigate to={redirectTo} replace />
  }

  return <SignInForm />
}
