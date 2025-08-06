'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [stage, setStage] = useState('monogram');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('fullname');
    }, 1500); // Switch after 1.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      exit={{ opacity: 0, transition: { duration: 0.75, delay: 1.5 } }}
    >
      <AnimatePresence mode="wait">
        {stage === 'monogram' && (
          <motion.div
            key="monogram"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: 'easeIn' } }}
            className="flex items-center justify-center"
          >
            <span className="font-serif text-7xl font-medium text-primary">A</span>
            <span className="font-serif text-7xl font-medium text-gold">F</span>
          </motion.div>
        )}

        {stage === 'fullname' && (
          <motion.div
            key="fullname"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
            className="text-center px-4"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-charcoal">Dra. Aline Foganholi</h1>
            <p className="text-sm font-light tracking-[4px] text-charcoal/70 uppercase mt-2">ODONTOLOGIA DE EXCELÊNCIA</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader;
