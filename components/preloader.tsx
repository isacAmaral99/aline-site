import { motion } from 'framer-motion';

const Preloader = () => {
  const monogramVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
    >
      <motion.div
        variants={monogramVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center"
      >
        <span className="font-serif text-7xl font-medium text-primary">A</span>
        <span className="font-serif text-7xl font-medium text-gold">F</span>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
