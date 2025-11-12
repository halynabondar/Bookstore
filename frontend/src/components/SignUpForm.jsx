import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { Checkbox, FormControlLabel } from '@mui/material'

export default function SignUpForm() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:p-10">
      <div className="flex min-w-full flex-col items-center justify-center gap-4 rounded-2xl bg-dark-100 p-6 shadow-xl sm:min-w-[430px]">
        <img src="/icon4.png" alt="books" className="w-12" />
        <h2 className="text-3xl font-semibold text-dark-700">
          Welcome to BookStore
        </h2>
        <p>Please sign un using the form below</p>
        <form className="flex w-full flex-col gap-4">
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
                type="password"
                id="password"
                autoComplete="new-password"
                minLength="8"
                placeholder="Enter your password..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
              />
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
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                minLength="8"
                placeholder="Confirm your password..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light"
              />
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
            className="w-full rounded-md bg-primary-dark py-2 text-dark-100 transition duration-300 hover:bg-primary-light"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  )
}
