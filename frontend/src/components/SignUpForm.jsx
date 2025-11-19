import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../hooks/index.js'

import FormMessage from './FormMessage.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { refreshUser } = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setMessage('✅ Account created successfully!')
        await refreshUser()
        navigate('/profile', { replace: true })
      } else {
        const errors = data.errors?.join(', ') || data.error || 'Sign up failed'
        setMessage(`❌ ${errors}`)
      }
    } catch (error) {
      console.error('Sign up error:', error)
      setMessage('⚠️ Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:p-10">
      <div className="flex min-w-full flex-col items-center justify-center gap-4 rounded-2xl bg-dark-100 p-6 shadow-xl sm:min-w-[430px]">
        <img src="/icon4.png" alt="books" className="w-12" />
        <h2 className="text-3xl font-semibold text-dark-700">
          Welcome to BookStore
        </h2>
        <p>Please sign un using the form below</p>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          {/* First Name field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name
            </label>
            <div className="relative">
              <AccountCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light/30" />
              <input
                type="firstName"
                id="firstName"
                autoComplete="given-name"
                placeholder="Enter your first name..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
                required
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
          </div>

          {/* Last Name field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </label>
            <div className="relative">
              <AccountCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light/30" />
              <input
                type="lastName"
                id="lastName"
                autoComplete="family-name"
                placeholder="Enter your last name..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
                required
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <div className="relative">
              <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light/30" />
              <input
                type="email"
                id="email"
                aria-label="Enter your email"
                autoComplete="email"
                placeholder="Enter your email..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password field*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                minLength="8"
                placeholder="Enter your password..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>

          {/* Confirm password field*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                minLength="8"
                placeholder="Confirm your password..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
                required
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <FormControlLabel
            control={<Checkbox color="primary" required />}
            label={
              <span className="text-sm text-gray-700">
                I accept the{' '}
                <a
                  href="/terms"
                  className="text-primary-light underline hover:text-primary-dark"
                >
                  Terms of Use
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  className="text-primary-light underline hover:text-primary-dark"
                >
                  Privacy Policy
                </a>
              </span>
            }
          />
          <button
            type="submit"
            aria-label="Sign up"
            disabled={isLoading}
            className="w-full rounded-md bg-primary-dark py-2 text-dark-100 transition duration-300 hover:bg-primary-light"
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <FormMessage message={message} />
      </div>
    </section>
  )
}
