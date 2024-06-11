import React from 'react';
import styles from './HeroSection.module.css';
import CustomButton from '../button/CustomButton';

function HeroSection() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.herocontainer}>
        <video className={styles.video} src='/videos/video.mp4' autoPlay loop muted />
        <h1>NEORIS</h1>
        <p>Digital Business Transformation Accelerator</p>
        <div className={styles.herobtns}>
          <CustomButton href="/sign-up">Sign up</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
