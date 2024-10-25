'use client';

import { Input } from '@nextui-org/react';

type CustomInputProps = {
  label: string;
  icon?: any;
  type?: string;
  value: string | number;
  placeholder?: string;
  defaultValue?: string | number;
  onChangeHandler: (value: string) => void;
};

const CustomInput = ({
  label,
  icon,
  type,
  value,
  placeholder,
  onChangeHandler,
}: CustomInputProps) => {
  return (
    <Input
      className='border-default border-medium rounded-xl sm:mb-2'
      classNames={{
        label: 'text-black text-base',
      }}
      labelPlacement='outside'
      label={label}
      value={value.toString()}
      onValueChange={onChangeHandler}
      type={type}
      startContent={icon}
      placeholder={placeholder}
      isClearable
      onClear={() => console.log('input cleared')}
    />
  );
};

export default CustomInput;
