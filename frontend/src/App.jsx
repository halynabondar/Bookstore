import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Subscribe from './components/Subscribe.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'

export default function App() {
  const navList = [
    {
      name: 'Books',
      children: [
        { name: 'Fiction', path: '/books/fiction' },
        { name: 'Non-Fiction', path: '/books/non-fiction' },
        { name: 'Science', path: '/books/science' },
        { name: 'Fantasy', path: '/books/fantasy' },
      ],
    },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact us', path: '/contact' },
  ]

  const footerList = [
    'My account',
    'Orders',
    'Tracking list',
    'Terms & Conditions',
    'Privacy Policy',
    'FAQ',
  ]

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL
    fetch(`${api}/books`)
      .then(res => res.json())
      .then(data => console.log('Books:', data))
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-dark-100 text-textc">
      <Navbar navList={navList} />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Subscribe />
      </main>
      <Footer navList={navList} footerList={footerList} />
    </div>
  )
}
