import { motion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
};

const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className,
  highlightWords = [],
  highlightClassName = '',
}: AnimatedTextProps) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const words = text.split(' ');

  return (
    <Wrapper className={className}>
      <motion.span
        style={{ display: 'inline-block', overflow: 'hidden' }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
            className={highlightWords.includes(word.replace(/[.,]/g, '')) ? highlightClassName : ''}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
