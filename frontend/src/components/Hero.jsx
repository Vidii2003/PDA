import {React,useEffect} from 'react'
import {motion} from 'framer-motion'
import {styles} from  '../style'
import { IslandCanvas } from '.'
import { email,phone,glass } from '../assets';
import { Link } from 'react-router-dom';
import './hero.css';

const Hero = () => {
  
  return (
    // <section className="relative w-full h-screen mx-auto" style={{
    //   background: 'linear-gradient(to left, #2bc0e4, #eaecc6)'
    // }}>

 <section className="relative w-full h-[800px] mx-auto" style={{
    backgroundImage: 'url("https://miro.medium.com/v2/resize:fit:800/0*mwSrqAuApDDa1PZ5.jpg")',
    backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Adjust the sizing as needed
  backgroundPosition: 'center', // Adjust the positioning as needed
    }} >

  <div className='h-[800px] w-full' style={{background: "linear-gradient(to right, #ff416c, #ff4b2b)",opacity:"50%"}}></div>
    <div className='h-[200px] w-[900px] ml-[300px] tex'>
      
  <h1 className='animate-charcter mt-[200px]'>Discover Thyself.</h1><br/>
  <p className='text-[20px] text-white lineUp'>Embark on the transformative journey of self-discovery; for in understanding oneself, one unlocks the gateway to personal growth and empowers the spirit to flourish. Embrace the profound adventure of discovering the depths of your being with <span className='text-[#351641]'>PDA</span>, where we illuminate the path to self-realization and unleash the extraordinary potential within you.</p>
  
  
  </div>
 
    
    

  
 
  <div class="popup">
    <div class="popup-content">
      
    <Link to="/gallery" className="s">
      Explore our Gallery
    </Link>
      
     
    </div>  
  
</div>
    <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[54px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [5, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
         
{/* <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}> */}
    
    <div class="searchbox" className='px-10 py-8'>
    <button class="btnsearch"><img src={glass} className='w-10 h-10 object-contain' class="gls"/></button>
    <input type="text" class="inputsearch" placeholder="Type to Search..."/>
  </div>
  {/* <div className="mr-8">
    
  <img src={email} alt="logo" className="w-20 h-20 object-contain float-left px-2" />
    <h1 className={`${styles.heroSubText} text-[#050816] px-20 `}>

      Email<br />
      <span className="text-[#915eff]">pdamit22@gmail.com</span>
    </h1>
  </div>
  <div>
  <img src={phone} alt="logo" className="w-20 h-20 object-contain float-left px-2" />
    <h1 className={`${styles.heroSubText} text-[#050816] px-20`}>
      Phone<br />
      <span className="text-[#915eff]">Call Us: +91 97903 19116</span>
    </h1>
  </div> */}
  




    {/* </div> */}
    
   </section>
  )
}

export default Hero