import Footer from './components/Footer.jsx'
import HeroImage from './components/HeroImage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
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

  return (
    <>
      <Navbar navList={navList} />
      <HeroImage />
      <main className="mx-auto max-w-7xl"></main>
      <Footer navList={navList} footerList={footerList} />
    </>
  )
}

export default App
