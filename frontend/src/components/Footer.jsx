import React from 'react';
import './Footer.css';
import { call, mail,cal,fb,li,insta } from '../assets';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      
      <div className='flex font-bold' style={{ zIndex: 2000 }}>

        <div className='w-[400px] mr-8'>
       <h3 className='text-[20px] text-bold'>Have a Questions?</h3>
   <p>Madras Institute of Technology, Anna University, Chrompet
    <br/><br/>
   <a href="tel:+91 97903 19116"><img src={call} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/><p className='mt-2 hover:text-rose-900'>+91 97903 19116</p></a>
   <br/> 
   <a href="mailto:pdamit22@gmail.com"><img src={mail} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/><p className='mt-2 hover:text-rose-900'>pdamit22@gmail.com</p></a></p></div>
        <div className='w-[400px] mr-8'>
        <h3  className='text-[20px] text-bold'>Recent Events</h3>
        <a href=""><p className="hover:text-rose-900">SPONTANIA - the clubs of MIT have come together for a cheerful beginning to the sanguine future!</p>
        <img src={cal} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/><p className='mt-3'> Nov 25, 2021</p></a><br/>
        
        <a><p className="hover:text-rose-900">It’s time to flaunt your skills, strengths and qualities interviews as PDA proudly presents Resume Building Competition</p><img src={cal} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/> <p className='mt-3'>Nov 09, 2021</p></a>
        </div>
        <div className='w-[100px] mr-8 mb-5 ml-md-4'>
       
                    <h3 className='text-[20px] text-bold'>Links</h3>
                    <ul className="list-unstyled">
                        <li>
                          
                            <a href="#">Home</a>
                        </li>
                        <li>
                        <a href={`#about`} onClick={() => setActive(About)}>About</a>
                        </li>
                        <li>
                        <a href={`#work`} onClick={() => setActive(Events)}>Events</a>
                        </li>
                        <li>
                        
                        <Link to="/login"><span>Login</span></Link>
                        {/* <a href="/login" onClick={() => setActive(Login)}>Login</a> */}
                        </li>
                        <li>
                        <a href={`#map`} onClick={() => setActive(Contact)}>Contact</a>
                        </li>
                    </ul>
                
        </div>
        <div className='w-[300px] mr-8'>
        <h3 className='ml-[110px] text-[20px] text-bold'>Join Us Now!</h3><br/><Link
      to="/login"
      className="h-30 w-80 relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">Sign Up</span>
    </Link>
<h3 className='ml-[100px] mt-[30px]'>Connect With Us</h3><br/><div className='ml-[80px]'>
<a href="https://www.facebook.com/mitpda"><img src={fb} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/></a>
<a href="https://www.linkedin.com/company/personality-development-association-mit"><img src={li} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/></a>
<a href="https://www.instagram.com/pda_mit/"><img src={insta} className="h-[50px] w-[50px] rounded-full float-left mr-3 border-2 border-solid border-slate-950"/></a></div>
        </div>
      </div>
      <br/>
      <div className='h-[70px] w-full'>
  <div className='bg-black h-full text-center py-1.5'>
    <p className='text-white'>
      Copyright &copy; 2024 All rights reserved | This website is made with &#10084; by PDA Web Team
    </p>
  </div>
</div>

    </footer>
    
  );
};

export default Footer;
