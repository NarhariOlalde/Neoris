import React from 'react';
import styles from '../styles/HeroSection.module.css';
import CustomButton from './CustomButton';

function HeroSection() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.herocontainer}>
        <video className={styles.video} src='/videos/video.mp4' autoPlay loop muted />
        <h1>NEORIS</h1>
        <p>Digital Business Transformation Accelerator</p>
        <div className={styles.herobtns}>
          <CustomButton href="/services" transparent>Services</CustomButton>
          <CustomButton href="/sign-up">Sign up</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
