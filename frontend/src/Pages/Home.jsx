import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, StarsCanvas, Footer, Map, EarthCanvas } from '../components';

const Home = () => {
    return (
        <div className="relative z-0 bg-[#ECEFF1]">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar/>
              
              <Hero/>
            </div>
            <About/>
            <div style={{height:"200px"}} ></div>
            <div className='relative z-0 bg-[#050816] w-[1400px] ml-[30px] rounded-full h-[700px]'>
            <Contact/>
            
          <StarsCanvas/>
          <div style={{height:"200px"}} ></div>
            </div>
            
            <Experience/>
            <div style={{height:"100px"}} ></div>
          <div className="relative z-0">
            <Map/>
            <div style={{height:"120px"}} ></div>
          <Footer/>
          
          </div>
          
          </div>
       )
}

export default Home;