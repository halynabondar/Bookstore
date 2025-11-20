import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUser } from '../hooks/index.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function GoogleSignIn() {
  const buttonRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { refreshUser } = useUser()

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error('VITE_GOOGLE_CLIENT_ID is not defined')
      return
    }

    async function handleCredentialResponse(response) {
      if (!response?.credential) return

      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/google_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ credential: response.credential }),
        })

        const data = await res.json().catch(() => ({}))

        if (res.ok) {
          await refreshUser()
          const redirectTo = location.state?.from?.pathname || '/profile'
          navigate(redirectTo, { replace: true })
        } else {
          console.error('Google login failed:', data.error || data.message)
        }
      } catch (error) {
        console.error('Google login error:', error)
      } finally {
        setLoading(false)
      }
    }

    function initializeGoogle() {
      if (!window.google || !buttonRef.current) return

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
      })
    }

    if (window.google && window.google.accounts && window.google.accounts.id) {
      initializeGoogle()
    } else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initializeGoogle
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [navigate, location, refreshUser])

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={buttonRef} />

      {loading && (
        <p className="text-xs text-gray-400">Signing in with Google…</p>
      )}
    </div>
  )
}
