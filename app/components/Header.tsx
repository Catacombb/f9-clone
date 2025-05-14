"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/f9-logo.svg" alt="F9 Productions" width={180} height={50} />
          </Link>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/#portfolio">Portfolio</Link>
            </li>
            <li className={`${styles.navItem} ${styles.hasSubmenu}`}>
              <span>Service Areas</span>
              <ul className={styles.submenu}>
                <li className={`${styles.submenuItem} ${styles.hasSubmenu}`}>
                  <span>Residential Architecture</span>
                  <ul className={styles.nestedSubmenu}>
                    <li><Link href="/#residential">Residential</Link></li>
                    <li><Link href="/#additions">Additions and Remodels</Link></li>
                    <li><Link href="/#custom-home">Custom Home Architect</Link></li>
                    <li><Link href="/#adu">ADU</Link></li>
                    <li><Link href="/#mountain-homes">Mountain Homes</Link></li>
                    <li><Link href="/#interior-design">Interior Design Services</Link></li>
                  </ul>
                </li>
                <li><Link href="/#multi-family">Multi-Family Architecture</Link></li>
                <li><Link href="/#commercial">Commercial Architecture</Link></li>
                <li><Link href="/#design-build">Design Build</Link></li>
                <li className={`${styles.submenuItem} ${styles.hasSubmenu}`}>
                  <span>Locations</span>
                  <ul className={styles.nestedSubmenu}>
                    <li><Link href="/#longmont">Longmont</Link></li>
                    <li><Link href="/#denver">Denver</Link></li>
                    <li><Link href="/#boulder">Boulder</Link></li>
                    <li><Link href="/#aspen">Aspen</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.hasSubmenu}`}>
              <span>About</span>
              <ul className={styles.submenu}>
                <li><Link href="/#about-f9">About F9</Link></li>
                <li><Link href="/#process">How Our Architectural Design Process Works</Link></li>
                <li><Link href="/#blog">Blog</Link></li>
                <li><Link href="/#foundations">F9 Foundations</Link></li>
                <li><Link href="/#good-bad">Good Architect Bad Architect</Link></li>
                <li><Link href="/#sustainability">F9 Sustainability</Link></li>
              </ul>
            </li>
            <li className={styles.navItem}>
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
          
          <div className={styles.mobileCta}>
            <Link href="/#book" className="btn">Book A Call</Link>
            <a href="https://f9-psi.vercel.app" className={styles.onboardingBtn} target="_blank" rel="noopener noreferrer">Onboarding</a>
          </div>
        </nav>

        <div className={styles.cta}>
          <Link href="/#book" className="btn">Book A Call</Link>
          <a href="https://f9-psi.vercel.app" className={styles.onboardingBtn} target="_blank" rel="noopener noreferrer">Onboarding</a>
        </div>
      </div>
    </header>
  );
};

export default Header; 