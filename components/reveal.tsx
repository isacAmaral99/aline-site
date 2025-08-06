import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.7, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
