import React, { useEffect } from 'react'
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'
import HomeContent_1 from './Components/HomeContent/HomeContent_1'
import HomeContent_2 from './Components/HomeContent/HomeContent_2'
import Discount from './Components/HomeContent/Discount'


function Home() {

  useEffect(() => {
    //check if there's a hash in the URL(#products-section)
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth"})
      }
    }
  }, []); //empty dependency array means this runs once when component mounts


  return (
    <div>
        <Nav />
        <HomeContent_1 />
        <Discount />
        <HomeContent_2 />
        <Footer />
    </div>
  )
}

export default Home