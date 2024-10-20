import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";




const About = () => {
  return (
    <div className="ml-10">
      
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
     
    </div>
  );
};
const ServiceCard = ({ index, title, icon ,content}) => {
  return (
    <Tilt className='xs:w-[200px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full violet-blue-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='rounded-[20px] py-3 px-3 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain rounded-xl'
        />

        <h3 className='text-black text-[20px] font-bold text-center '>
          {title}
        </h3>
        <p className="text-black">{content}</p>
      </div>
    </motion.div>
  </Tilt>
  
  );
};

export default SectionWrapper(About, "about");