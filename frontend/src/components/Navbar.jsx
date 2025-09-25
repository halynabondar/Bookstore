import PropTypes from 'prop-types'
import {useState} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar({navList}) {
    const [active, setActive] = useState('Books')
    const [open, setOpen] = useState(false)

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

                {/* Desktop menu */}
                <ul className="hidden items-center gap-2 md:flex lg:gap-6">
                    {navList.map(item => (
                        <li key={item}>
                            <button
                                type="button"
                                onClick={() => setActive(item)}
                                aria-current={active === item ? 'page' : undefined}
                                className={`cursor-pointer rounded-md px-4 py-1 transition-colors duration-300 hover:bg-primary-dark/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark/80 ${
                                    active === item ? 'font-bold underline' : ''
                                }`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Cart (desktop only) */}
                <div className='gap-4 items-center hidden md:inline-flex'>
                    <button type='button' className='hover:text-primary-light transition duration-300 flex gap-1'>Cart<ShoppingCartIcon sx={{ fontSize: 27 }} /></button>
                    <button type='button' className='hover:text-primary-light transition duration-300'><AccountCircleIcon sx={{ fontSize: 27 }} /></button>
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

            {/* Mobile panel: does NOT take space when closed */}
            <div className={`${open ? 'block' : 'hidden'} md:hidden`}>
                <div className="border-t border-white/10 bg-surface text-textc">
                    <ul className="flex flex-col gap-1 px-4 py-2">
                        {navList.map(item => (
                            <li key={item}>
                                <button
                                    type="button"
                                    className="w-full rounded-md px-3 py-2 text-left leading-none hover:bg-primary-dark/10 hover:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark/60"
                                    onClick={() => setOpen(false)}
                                    aria-label={`Go to ${item}`}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                        {/*<li className="pt-1">*/}
                        {/*    <button*/}
                        {/*        type="button"*/}
                        {/*        className="w-full rounded-md bg-primary-dark px-3 py-2 leading-none text-textc-onDark hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark/60"*/}
                        {/*        onClick={() => setOpen(false)}*/}
                        {/*    >*/}
                        {/*        Logout*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    navList: PropTypes.arrayOf(PropTypes.string).isRequired,
}
