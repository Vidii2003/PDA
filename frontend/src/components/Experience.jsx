import React from "react";
import "./experience.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { github } from "../assets";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
     
      contentStyle={{
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        color: "#000",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
     
      icon={
        <div className='flex justify-center items-center w-full h-full '>
          <img
            src={experience.icon}
            className='w-[90%] h-[90%] object-contain rounded-full'
          />
        </div>
      }
    >
      <div className="gap-20">
        <center><img src={experience.image} className="h-[300px] w-[300px]" /></center>
        <br/>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
       
      </div>
      

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
      <br/>
      <div class="container">
		<div class="btn"><a href="#">Apply Now</a></div>
		</div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      {/* ... (motion.div and other components) */}
      
      <div className='mt-5 flex flex-col'>
        <h2 className="font-black text-blue text-[40px] text-black ml-[100px] py-5" style={{ animation: 'inner-left 1s 1s ease both, text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both'}}>Events</h2>
        <VerticalTimeline lineColor={'#1d2671'}>
        
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};



export default SectionWrapper(Experience, "work");