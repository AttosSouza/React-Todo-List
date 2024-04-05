import React from 'react';
import styles from './Input.module.css';

const Input = ({ id, label, onChange, ...props }) => {
  return (
    <>
      <input
        id={id}
        name={id}
        onChange={onChange}
        className={styles.input}
        {...props}
      />
    </>
  );
};

export default Input;
