import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {useUser} from '../hooks/index.js'

export default function Navbar({navList}) {
    const [open, setOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(null)
    const location = useLocation()
    const closeTimeout = useRef(null)
    const navigate = useNavigate()
    const {user, signOut} = useUser()

    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const userMenuTimeout = useRef(null)

    const displayName = user?.first_name || user?.email?.split?.('@')?.[0]

    const handleClick = () => {
        navigate('/signin')
    }

    const handleMouseEnter = name => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current)
        setDropdownOpen(name)
    }

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => setDropdownOpen(null), 250)
    }

    const handleUserMouseEnter = () => {
        if (userMenuTimeout.current) clearTimeout(userMenuTimeout.current)
        setUserMenuOpen(true)
    }

    const handleUserMouseLeave = () => {
        userMenuTimeout.current = setTimeout(() => {
            setUserMenuOpen(false)
        }, 200)
    }

    return (
        <nav className="sticky top-0 z-50 bg-dark-100 text-primary-dark shadow">
            {/* Compact top row */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
                <a
                    href="/"
                    className="font-mono text-lg font-bold text-textc-muted transition duration-300 hover:opacity-80 sm:text-2xl"
                >
                    BookStore
                </a>

                <ul className="hidden items-center md:flex">
                    {navList.map(item => (
                        <li key={item.name} className="relative text-nowrap">
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
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                fontSize: 20,
                                                transition: 'transform 0.2s',
                                                transform:
                                                    dropdownOpen === item.name
                                                        ? 'rotate(180deg)'
                                                        : 'none',
                                            }}
                                        />
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
                                    className={`cursor-pointer rounded-md px-4 py-2 transition-colors duration-300 hover:bg-primary-dark/10 ${
                                        location.pathname === item.path ? 'font-bold underline' : ''
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Desktop icons + user menu */}
                <div className="hidden items-center gap-4 md:inline-flex lg:gap-6">
                    {/* Cart icon */}
                    <button
                        type="button"
                        className="flex gap-1 transition duration-300 hover:text-primary-light" onClick={() => navigate('/cart')}
                    >
                        <ShoppingCartIcon sx={{fontSize: 27}}/>
                    </button>

                    {/* User menu */}
                    {user ? (
                        <div
                            className="relative"
                            onMouseEnter={handleUserMouseEnter}
                            onMouseLeave={handleUserMouseLeave}
                        >
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="flex items-center gap-2 rounded-md px-3 py-1 hover:bg-primary-dark/10 transition"
                            >
                                <AccountCircleIcon sx={{fontSize: 24}}/>
                                <span className="font-medium">{displayName}</span>
                                <KeyboardArrowDownIcon sx={{fontSize: 20}}/>
                            </button>

                            {userMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-40 rounded-md bg-dark-200 shadow-lg ring-1 ring-black/10">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-primary-dark/10"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={signOut}
                                        className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-primary-dark/10"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleClick}
                            className="rounded-md border border-primary-dark bg-dark-100 px-4 py-1 transition duration-300 hover:border-primary-light hover:bg-primary-light hover:text-dark-100"
                        >
                            Sign in
                        </button>
                    )}
                </div>

                {/* Burger menu */}
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
                                        {/* Books Dropdown */}
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
                                            <KeyboardArrowDownIcon
                                                sx={{
                                                    fontSize: 20,
                                                    transition: 'transform 0.2s',
                                                    transform:
                                                        dropdownOpen === item.name
                                                            ? 'rotate(180deg)'
                                                            : 'none',
                                                }}
                                            />
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
