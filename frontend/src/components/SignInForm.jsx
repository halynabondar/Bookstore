import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

import GoogleSignIn from './GoogleSignIn.jsx'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Sign in successful!')
        /* TO DO
                // e.g. redirect to dashboard
                window.location.href = "/dashboard";
                 */
      } else {
        setMessage(`❌ ${data.message || 'Invalid credentials'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('⚠️ Something went wrong. Please try again.')
    }
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:p-10">
      <div className="flex min-w-full flex-col items-center justify-center gap-4 rounded-2xl bg-dark-100 p-6 shadow-xl sm:min-w-[430px]">
        <img src="/icon4.png" alt="books" className="w-12" />
        <h2 className="text-3xl font-semibold text-dark-700">
          Welcome to BookStore
        </h2>
        <p>Please sign in using the form below</p>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <div className="relative">
              <AccountCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                aria-label="Enter your email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                aria-label="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
              />
              <VisibilityOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400" />
              <VisibilityIcon className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400" />
            </div>
            <p className="text-right text-sm">
              Forgot your password?{' '}
              <a
                aria-label="Reset password"
                href="/reset-password"
                className="text-primary-light underline"
              >
                Reset it
              </a>
            </p>
          </div>
          <button
            type="submit"
            aria-label="Sign in"
            className="w-full rounded-md bg-primary-dark py-2 text-dark-100 transition duration-300 hover:bg-primary-light"
          >
            Sign In
          </button>
          <div className="my-2 flex w-full items-center">
            <hr className="grow border-gray-300" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <hr className="grow border-gray-300" />
          </div>
          <GoogleSignIn aria-label="Google SignIn" />
        </form>
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <a
            aria-label="Sign up"
            className="text-primary-light underline"
            href="/signup"
          >
            Sign up
          </a>
        </p>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </section>
  )
}
