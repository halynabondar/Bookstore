import { Navigate } from 'react-router-dom'

import { useUser } from '../hooks/index.js'

export default function CartPage() {
  const { user } = useUser()

  if (!user) return <Navigate to="/signin" replace />

  return <div>CartPage</div>
}
