'use client';

import { useState, ChangeEvent } from 'react';

const useInput = (inputName: string, inputUsername: string) => {
  const [name, setName] = useState(inputName);
  const [username, setUsername] = useState(inputUsername);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'username') {
      setUsername(value);
    }
  };

  return { name, username, onChangeHandler };
};

export default useInput;
