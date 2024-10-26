'use client';

import { Input } from '@nextui-org/react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

type FormInputProps = {
  name: string;
  error?: Merge<FieldError, FieldErrorsImpl<{}>> | null;
  control: Control<any, any> | undefined;
  register: UseFormRegister<any>;
  label: string;
  icon?: any;
  type?: string;
  defaultValue?: string;
};

const FormInput = ({
  name,
  error = null,
  control,
  register,
  label,
  icon,
  type = 'text',
  defaultValue = '',
}: FormInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Input
            className='border-default border-medium rounded-xl sm:mb-2'
            classNames={{
              label: 'text-black text-base',
            }}
            labelPlacement='outside'
            label={label}
            {...register(name)}
            value={value}
            onValueChange={onChange}
            type={type}
            errorMessage={error?.message}
            isInvalid={!!error}
            startContent={icon}
          />
        )}
      />
    </>
  );
};

export default FormInput;
