import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PropTypes from 'prop-types'

export default function Footer({ navList, footerList }) {
  return (
    <footer className="bg-dark-100 text-primary-dark">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:p-10">
        <div className="gap-14 md:grid md:grid-cols-2">
          <div className="space-y-8 md:col-span-1">
            <div>
              <a
                href="/"
                className="font-mono text-lg font-bold text-textc-muted transition duration-300 hover:opacity-80 sm:text-2xl"
              >
                BookStore
              </a>
            </div>
            <h2 className="font-sans text-4xl text-primary-dark">
              Start Your Empowering Reading Adventure
            </h2>
            <button className="flex gap-2 rounded-2xl bg-primary-dark px-3 py-2 text-textc-onDark transition duration-300 hover:bg-primary-light">
              Contact us
              <ArrowForwardIcon />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2 md:mt-0">
            <div>
              <h3 className="font-mono text-lg font-bold leading-none text-primary-dark">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {navList.map(item => (
                  <li
                    key={item}
                    className="cursor-pointer text-primary-dark transition-colors duration-300 hover:text-secondary-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                {footerList.map(item => (
                  <li
                    key={item}
                    className="cursor-pointer text-primary-dark transition-colors duration-300 hover:text-secondary-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-dark/20 pt-8">
          <p className="text-center text-sm text-primary-dark">
            &copy; 2025 BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  navList: PropTypes.arrayOf(PropTypes.string).isRequired,
  footerList: PropTypes.arrayOf(PropTypes.string).isRequired,
}
