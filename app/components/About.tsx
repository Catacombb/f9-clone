"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>About Us</h2>
          <h3 className={styles.sectionSubtitle}>PREMIER COLORADO ARCHITECTS SERVING YOUR VISION</h3>
        </motion.div>
        
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>Welcome to F9 Productions, the premier architecture and design firm serving all of Colorado. We consistently deliver our clients outstanding attention and service with our thoughtful team of personable, friendly, and creative design professionals.</p>
          <p>We are an award winning, experienced, and energetic team that have been providing world-class architectural design services to the Colorado Front Range, and beyond, since 2009. As leading Colorado architects, we specialize in creating innovative, functional, and beautiful designs that reflect the unique style and spirit of our clients.</p>
          
          <div className={styles.cta}>
            <Link href="/#portfolio" className={styles.btn}>View our portfolio</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 