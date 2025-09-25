import Footer from './components/Footer.jsx'
import HeroImage from './components/HeroImage.jsx'
import Navbar from './components/Navbar.jsx'
import {useEffect} from "react";

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

    useEffect(() => {
        const api = import.meta.env.VITE_API_URL;
        fetch(`${api}/books`)
            .then((res) => res.json())
            .then((data) => console.log("Books:", data));
    }, []);

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
