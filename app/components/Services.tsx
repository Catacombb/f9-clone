"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Services.module.css';

const services = [
  {
    id: 1,
    title: "Colorado Expertise: Building Your Vision",
    description: "With offices in Longmont and Denver, F9 Productions is ideally positioned to provide exceptional architectural services throughout all of Colorado. Our team of skilled and experienced architects has a deep understanding of Colorado architecture including Boulder and Denver, design and aesthetics, and meeting the challenges that come with building in the Rocky Mountain Region.",
    icon: "/service-icon1.svg"
  },
  {
    id: 2,
    title: "Communication & Speed: Your Project, Streamlined",
    description: "We work closely with our clients, builders, and contractors to ensure that everyone is on the same page from start to finish. At F9 Productions, we believe that collaboration and communication are key to the success of any project. One of our Nine Founding Principles is that we always try to respond to all forms of communication within an hour. Our efficient and streamlined processes help to minimize delays and maximize results, making your project a success in every way.",
    icon: "/service-icon2.svg"
  },
  {
    id: 3,
    title: "Design-Build Harmony: Seamless Project Delivery",
    description: "What sets us apart from other architects in Colorado is our intimate knowledge in both the design and build process. We operate alongside our sister company, F14 Productions, a construction firm, and build a handful of our design project. This collaborative, hands-on approach allows us to provide expert guidance and oversight throughout every phase of your project, ensuring that your vision is realized to perfection. It also ensures that we, as architects, know all the master planning needed to execute from blueprints to building.",
    icon: "/service-icon3.svg"
  }
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "1000+", label: "Projects Performed" },
  { value: "100+", label: "Clients Served" }
];

const Services = () => {
  return (
    <section className={styles.services}>
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Working with us</h2>
          <h3 className={styles.sectionSubtitle}>Why Choose Us</h3>
        </motion.div>
        
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.serviceIcon}>
                <Image src={service.icon} alt={service.title} width={60} height={60} />
              </div>
              <h4 className={styles.serviceTitle}>{service.title}</h4>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 