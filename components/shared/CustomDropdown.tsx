'use client';

import { Control, Controller } from 'react-hook-form';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

type CustomDropdownProps = {
  name: string;
  control: Control<any, any> | undefined;
  items: string[];
  defaultValue?: string;
};

const CustomDropdown = ({
  name,
  control,
  items,
  defaultValue: defaultVal = undefined,
}: CustomDropdownProps) => {
  const defaultValue = defaultVal ? [defaultVal] : [items[0]];
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant='bordered'
                className='capitalize flex justify-start p-2 bg-default-100'
              >
                {value}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Single selection'
              variant='flat'
              disallowEmptySelection
              selectionMode='single'
              selectedKeys={value}
              onSelectionChange={(selected) =>
                onChange(Array.from(selected)[0])
              }
            >
              {items?.map((item) => (
                <DropdownItem key={item}>{item}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      />
    </>
  );
};

export default CustomDropdown;
