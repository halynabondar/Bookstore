import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Subscribe from './components/Subscribe.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import CartPage from './pages/CartPage.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Home from './pages/Home.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Shop from './pages/Shop.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

export const navList = [
  { name: 'Books', path: '/books' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact us', path: '/contact' },
]

export const footerList = [
  { name: 'My account', path: '/account' },
  { name: 'Orders', path: '/orders' },
  { name: 'Tracking list', path: '/tracking' },
  { name: 'Terms & Conditions', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'FAQ', path: '/faq' },
]

export default function App() {

  return (
    <div className="flex min-h-screen flex-col bg-dark-100 text-textc">
      <Navbar navList={navList} />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/books/:genre" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <CartPage />
              </RequireAuth>
            }
          />
        </Routes>
        <Subscribe />
      </main>
      <Footer navList={navList} footerList={footerList} />
    </div>
  )
}
