import {createContext, useContext, useState, useEffect} from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const UserContext = createContext(null)

export function UserProvider({children}) {
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

            const user = await response.json()
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
                credentials: 'include'
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
        signOut
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}
