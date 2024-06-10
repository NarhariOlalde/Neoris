import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from './CustomButton.module.css';

const CustomButton = ({ href, children, color = 'primary', variant = 'contained', onClick, transparent }) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  const buttonClass = transparent ? styles.transparentButton : '';

  return (
    <Button
      onClick={handleClick}
      color={color}
      variant={variant}
      className={`${buttonClass} ${styles.customButton}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
