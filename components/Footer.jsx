import React from 'react';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <section className={styles.footerContent}>
        {/* About Us */}
        <div className={styles.footerLinks}>
          <div className={styles.footerLinkWrapper}>
            <div className={styles.footerLinkItems}>
              <h2>About Us</h2>
              <a href='/sign-up'>How it works</a>
              <a href='/'>Testimonials</a>
              <a href='/'>Careers</a>
              <a href='/'>Investors</a>
              <a href='/'>Terms of Service</a>
            </div>
            <div className={styles.footerLinkItems}>
              <h2>Contact Us</h2>
              <a href='/'>Contact</a>
              <a href='/'>Support</a>
              <a href='/'>Sponsorships</a>
            </div>
          </div>
          <div className={styles.footerLinkWrapper}>
            <div className={styles.footerLinkItems}>
              <h2>Videos</h2>
              <a href='/'>Submit Video</a>
              <a href='/'>Ambassadors</a>
              <a href='/'>Agency</a>
              <a href='/'>Influencer</a>
            </div>
            <div className={styles.footerLinkItems}>
              <h2>Social Media</h2>
              <a href='/'>Instagram</a>
              <a href='/'>Facebook</a>
              <a href='/'>Youtube</a>
              <a href='/'>Twitter</a>
            </div>
          </div>
        </div>
        {/* Social Media */}
        <section className={styles.socialMedia}>
          <div className={styles.socialMediaWrap}>
            <div className={styles.footerLogo}>
              <a href='/' className={styles.socialLogo}>
                Neoris 
                {/* <img src='./images/logo_vidaplena.png' alt='' className={styles.logo} /> */}
              </a>
            </div>
            <small className={styles.websiteRights}>Neoris © 2024</small>
            <div className={styles.socialIcons}>
              <a
                className={`${styles.socialIconLink} facebook`}
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-f' />
              </a>
              <a
                className={`${styles.socialIconLink} instagram`}
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <i className='fab fa-instagram' />
              </a>
              <a
                className={`${styles.socialIconLink} youtube`}
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Youtube'
              >
                <i className='fab fa-youtube' />
              </a>
              <a
                className={`${styles.socialIconLink} twitter`}
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter'
              >
                <i className='fab fa-twitter' />
              </a>
              <a
                className={`${styles.socialIconLink} linkedin`}
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
              >
                <i className='fab fa-linkedin' />
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Footer;
