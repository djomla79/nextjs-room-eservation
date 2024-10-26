'use client';

import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';

type CustomCheckboxGroupProps = {
  name: string;
  error?: Merge<FieldError, FieldErrorsImpl<{}>> | null;
  control: Control<any, any> | undefined;
  options: string[];
  defaultValue?: string[];
};

const CustomCheckboxGroup = ({
  name,
  error = null,
  control,
  options,
  defaultValue = [],
}: CustomCheckboxGroupProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => {
            return (
              <CheckboxGroup
                label='Select Amenities'
                color='warning'
                value={value}
                onValueChange={onChange}
              >
                {options?.map((option, index) => (
                  <Checkbox key={index} value={option}>
                    {option.replace(/^[^A-Z]+/, '')}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            );
          }}
        />
        {!!error && <span>{error?.message}</span>}
      </>
    </div>
  );
};

export default CustomCheckboxGroup;
