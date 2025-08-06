import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "hidden lg:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference",
        isHovering ? 'bg-ivory' : 'bg-ivory'
      )}
      animate={{
        x: position.x - (isHovering ? 20 : 5),
        y: position.y - (isHovering ? 20 : 5),
        width: isHovering ? 40 : 10,
        height: isHovering ? 40 : 10,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
    />
  );
};

export default CustomCursor;
