import React from 'react';

export const useTask = () => {
  const [task, setTask] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (value.length === 0) {
      setError('Fill in a value');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function handleChange({ target }) {
    if (error) validate(target.value);
    setTask(target.value);
  }

  function handleBlur({ target }) {
    validate(target.value);
  }

  return { task, error, handleChange, handleBlur, validate, setTask };
};
