import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'

export default function App() {
  const navList = ['Books', 'Shop', 'About', 'Blog', 'Contact us']
  const footerList = [
    'Style Guide',
    'Licesing',
    'Changelog',
    'Error 404',
    'Password',
    'Privacy Policy',
    'Return Policy',
    'Coming Soon',
  ]

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL
    fetch(`${api}/books`)
      .then(res => res.json())
      .then(data => console.log('Books:', data))
  }, [])

  return (
    <>
      <Navbar navList={navList} />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer navList={navList} footerList={footerList} />
    </>
  )
}
