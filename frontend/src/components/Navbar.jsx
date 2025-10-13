import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ navList }) {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const location = useLocation()
  const closeTimeout = useRef(null)

  const handleMouseEnter = name => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdownOpen(name)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(null), 250)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-dark-100 text-primary-dark shadow-md">
      {/* Compact top row */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a
          href="/"
          className="font-mono text-lg font-bold text-textc-muted transition duration-300 hover:opacity-80 sm:text-2xl"
        >
          BookStore
        </a>

        <ul className="hidden items-center gap-2 md:flex lg:gap-6">
          {navList.map(item => (
            <li key={item.name} className="relative">
              {item.children ? (
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`cursor-pointer rounded-md px-4 py-1 transition-colors duration-300 hover:bg-primary-dark/10 focus:outline-none ${
                      dropdownOpen === item.name ? 'font-bold underline' : ''
                    }`}
                  >
                    {item.name}
                  </button>

                  {/* Desktop menu */}
                  {dropdownOpen === item.name && (
                    <ul className="absolute left-0 mt-2 w-40 rounded-md bg-dark-200 shadow-lg ring-1 ring-black/10">
                      {item.children.map(sub => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className="block px-4 py-2 text-sm hover:bg-primary-dark/10"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`cursor-pointer rounded-md px-4 py-1 transition-colors duration-300 hover:bg-primary-dark/10 ${
                    location.pathname === item.path ? 'font-bold underline' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="hidden items-center gap-10 md:inline-flex">
          <div className="flex gap-4">
            {/* User */}
            <button
              type="button"
              className="transition duration-300 hover:text-primary-light"
            >
              <AccountCircleIcon sx={{ fontSize: 27 }} />
            </button>

            {/* Cart */}
            <button
              type="button"
              className="flex gap-1 transition duration-300 hover:text-primary-light"
            >
              <ShoppingCartIcon sx={{ fontSize: 27 }} />
            </button>
          </div>

          {/* Login */}
          <div>
            <button
              type="button"
              className="rounded-md border border-primary-dark bg-dark-100 px-4 py-1 transition duration-300 hover:border-primary-light hover:bg-primary-light hover:text-dark-100"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Burger (mobile only) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? (
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          ) : (
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden`}>
        <div className="border-t border-white/10 bg-surface text-textc">
          <ul className="flex flex-col gap-1 px-4 py-2">
            {navList.map(item => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    {/* Dropdown для Books */}
                    <button
                      type="button"
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === item.name ? null : item.name
                        )
                      }
                      className="w-full rounded-md px-3 py-2 text-left font-semibold hover:bg-primary-dark/10"
                    >
                      {item.name}
                    </button>

                    {dropdownOpen === item.name && (
                      <ul className="ml-4 flex flex-col gap-1">
                        {item.children.map(sub => (
                          <li key={sub.name}>
                            <Link
                              to={sub.path}
                              className="block rounded-md px-3 py-1 text-sm hover:bg-primary-dark/10"
                              onClick={() => {
                                setOpen(false)
                                setDropdownOpen(null)
                              }}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block rounded-md px-3 py-2 hover:bg-primary-dark/10"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
}
