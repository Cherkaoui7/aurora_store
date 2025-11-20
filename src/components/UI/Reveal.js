import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({ children, width = "100%", delay = 0 }) => { // Changed default to 100%
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    // REMOVED 'overflow: hidden' to stop text clipping
    <div ref={ref} style={{ position: "relative", width }}> 
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 }, // Reduced distance slightly
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};