import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Container from '../Container.jsx'

import FooterLinks from './FooterLinks.jsx'

export default function Footer({ navList, footerList }) {
  return (
    <footer className="bg-dark-100 py-12 text-primary-dark md:py-16">
      <Container>
        <div className="flex flex-col justify-between gap-14 md:flex-row">
          <div className="w-full space-y-8 md:w-1/2">
            <Link
              to="/"
              className="font-mono text-lg font-bold text-textc-muted transition duration-300 hover:opacity-80 sm:text-2xl"
            >
              BookStore
            </Link>

            <h2 className="font-sans text-4xl text-primary-dark">
              Start Your Empowering Reading Adventure
            </h2>

            <Link
              to="/contact"
              className="flex w-fit items-center gap-2 rounded-2xl bg-primary-dark px-3 py-2 text-textc-onDark transition duration-300 hover:bg-primary-light"
            >
              Contact us
              <ArrowForwardIcon />
            </Link>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row md:justify-between">
            <FooterLinks title="Quick Links" links={navList} />

            <FooterLinks title="Customer Area" links={footerList} />
          </div>
        </div>

        <div className="mt-8 border-t border-primary-dark/20 pt-8">
          <p className="text-center text-sm text-primary-dark">
            &copy; 2025 BookStore. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,

  footerList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
}
