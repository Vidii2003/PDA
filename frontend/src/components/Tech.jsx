import React from "react";
import { styles } from "../style";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
   <><h2 className={styles.sectionHeadText}>Skills.</h2>
   <div className='mt-20 flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div></>

  );
};

export default SectionWrapper(Tech, "");