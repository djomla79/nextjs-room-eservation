'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/validations/userValidation';
import { RegisterInputType } from '@/lib/types/userTypes';
import { BASE_URL } from '@/lib/constants';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const togglePassword = () => setIsVisible((prev) => !prev);

  const saveUser: SubmitHandler<RegisterInputType> = async (data) => {
    const { confirmPassword, ...user } = data;
    const { email, password } = user;

    try {
      await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      await signIn('credentials', {
        email,
        password,
        callbackUrl: `${BASE_URL}/profile`,
      });
      toast.success('User successfully registered.');
      reset();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <RegisterForm
      data={{
        handleSubmit,
        saveUser,
        register,
        errors,
        control,
        togglePassword,
        isVisible,
        watch,
      }}
    />
  );
};

export default Register;
