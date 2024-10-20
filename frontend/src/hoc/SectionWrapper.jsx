import { motion } from "framer-motion";

import { styles } from "../style";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section>
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;