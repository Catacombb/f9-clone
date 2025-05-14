"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "Tinker Homes has collaborated with F9 on more than 20 residential and commercial projects and we have enjoyed every interaction with F9 and their entire team. You can't find a better company to work with. Lance and Alex have a dynamic team focused on excellence. Their creativity and execution are always spot on.",
    author: "Brian Tinker"
  },
  {
    id: 2,
    text: "We feel very lucky to have found F9 Productions! We reached out to 40-50 design/architecture firms, contractors, etc., after purchasing our home in Superior with the hopes of doing a big renovation, and F9 ended up being the design company we chose. Alex was responsive, smart, experienced, and efficient. His colleague, Rebekah, was talented and awesome and she helped us craft a beautiful design that we couldn't be happier with.",
    author: "Adam Turek"
  },
  {
    id: 3,
    text: "Alex and Mark of F9 Productions designed our custom mountain house in 2020 and were wonderful to work with! The architectural plans were well thought out and detailed, and the team was very professional and easy to work with. The plans were approved by the county with no issues. Our experience working with F9 exceeded our expectations, and we highly recommend them for architecture and design projects!",
    author: "Erin V. Bawa"
  },
  {
    id: 4,
    text: "We've been working with F9 regularly for many years now. They've never failed to deliver a professional in very timely manner. Very responsive! We love working with them on both commercial and residential projects.",
    author: "Darin Ramirez"
  },
  {
    id: 5,
    text: "I have trusted F9 with my architectural designs for over 7 years now. They are incredibly professional and thorough. It is a testament to their workmanship that builders consistently compliment the quality of their drawings. I highly recommend this firm for your architectural needs!",
    author: "Missy Brown"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  // Auto-scroll through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Our Clients</h2>
          <h3 className={styles.sectionSubtitle}>Voices of Satisfaction</h3>
        </motion.div>
        
        <div className={styles.testimonialSlider}>
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className={`${styles.testimonialCard} ${index === current ? styles.active : ''}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: index === current ? 1 : 0,
                x: index === current ? 0 : 100,
                display: index === current ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <p className={styles.testimonialAuthor}>{testimonial.author}</p>
            </motion.div>
          ))}
          
          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`${styles.indicator} ${index === current ? styles.activeIndicator : ''}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 