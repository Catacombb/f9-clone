"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link href="/">
              <Image src="/f9-logo.svg" alt="F9 Productions" width={150} height={40} />
            </Link>
            <p>Serving all of Colorado including the entire Front Range and Western Slopes.</p>
          </div>
          
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h4>Services</h4>
              <ul>
                <li><Link href="/#residential">Residential Architecture</Link></li>
                <li><Link href="/#multi-family">Multi-Family Architecture</Link></li>
                <li><Link href="/#commercial">Commercial Architecture</Link></li>
                <li><Link href="/#design-build">Design Build</Link></li>
                <li><Link href="/#portfolio">Our Portfolio</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h4>About</h4>
              <ul>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/#process">How Our Architectural Design Process Works</Link></li>
                <li><Link href="/#foundations">F9 Foundations</Link></li>
                <li><Link href="/#good-bad">Good Architect Bad Architect</Link></li>
                <li><Link href="/#sustainability">F9 Sustainability</Link></li>
                <li><Link href="/#blog">Blog</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h4>Contact</h4>
              <div className={styles.contactInfo}>
                <div className={styles.office}>
                  <h5>Longmont Office</h5>
                  <p>825 Crisman Drive, Unit 100</p>
                  <p>Longmont, CO 80501</p>
                </div>
                <div className={styles.office}>
                  <h5>Denver Office</h5>
                  <p>1415 Park Ave W</p>
                  <p>Denver, CO 80205</p>
                </div>
                <div className={styles.contactDetails}>
                  <a href="mailto:LMC@F9Productions.com" className={styles.contactLink}>
                    <FaEnvelope /> LMC@F9Productions.com
                  </a>
                  <a href="tel:3037757406" className={styles.contactLink}>
                    <FaPhone /> 303.775.7406
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.social}>
            <a href="https://facebook.com" aria-label="Facebook" className={styles.socialLink}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className={styles.socialLink}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className={styles.socialLink}>
              <FaInstagram />
            </a>
          </div>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} F9 Productions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 