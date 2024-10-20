import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import './contact.css';
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { library,helpinghand,interview,magazine,session,persofest } from "../assets";
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
   
    <div
      className={`xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden ml-20 h-[500px]`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-transparent-100 p-8 rounded-2xl'
      >
      <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={library} className='w-10 h-10 object-contain' class="gls2"/></button>
    <div class="input-search"><h6>Library</h6><p>An open source non-profitable, easy to access depository of books filled with vibrant ideas.</p></div>
  </div>
  <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={session} className='w-10 h-10 object-contain' class="gls2"/></button>
    <div class="input-search"><h6>Weekly Session</h6><p>Practice make you perfect PDA inspires students to aspire for GREATNESS. The weekly session proves to be the best platform for it.</p></div>
  </div>
  <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={persofest} className='w-10 h-10 object-contain' class="gls2"/></button>
    <div class="input-search"><h6>Persofest</h6><p>A festival that celebrates the hidden talents of students of MIT. An oppurtunity to find you.</p></div>
  </div>  
  

      </motion.div>

      <motion.div
        variants={slideIn("middle", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
        
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-[300px] md:h-[550px] h-[350px] ml-[100px]'
      >
        <br></br>
        <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={interview} className='w-10 h-10 object-contain' class="gls1"/></button>
    <div class="input-search"><h6>Mock Interview</h6><p>Grand event hosted by PDA related to academics.</p></div>
  </div>
  <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={helpinghand} className='w-10 h-10 object-contain' class="gls1"/></button>
    <div class="input-search"><h6>Helping Hand</h6><p>Got into any distress? We are all ears !! Let us Know !!</p></div>
  </div>
  <div class="search-box" className='px-10 py-12'>
    <button class="btn-search"><img src={magazine} className='w-10 h-10 object-contain' class="gls1"/></button>
    <div class="input-search"><h6>Magazine</h6><p>This is the song of all hearts in MIT!! An illustration on MIT's expertise in fields such as Photography, Writing, Drawing...</p></div>
  </div>  

        
      </motion.div>
    </div>
   
  );
};

export default SectionWrapper(Contact, "contact");