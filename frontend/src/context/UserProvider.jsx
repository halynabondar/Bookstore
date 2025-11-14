import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { UserContext } from './UserContext.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const refreshUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        credentials: 'include',
      })
      if (!response.ok) {
        setUser(null)
        return
      }

      const data = await response.json()
      setUser(data.user || data)
    } catch (error) {
      console.error('Failed to fetch current user:', error)
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setInitializing(false))
  }, [])

  const signOut = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'DELETE',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Failed to log out:', error)
    } finally {
      setUser(null)
    }
  }

  const value = {
    user,
    initializing,
    refreshUser,
    signOut,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node,
}
