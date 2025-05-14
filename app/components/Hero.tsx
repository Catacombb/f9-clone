"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Colorado Architecture Firm
        </motion.h1>
        <motion.h2 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build your vision with F9 Productions
        </motion.h2>
        <motion.h3 
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          More than design: Architecture, Construction and Development
        </motion.h3>
        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/#book" className="btn">Book A Call</Link>
          <Link href="/#portfolio" className={styles.secondaryBtn}>View our portfolio</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 