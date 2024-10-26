'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoomSchema } from '@/lib/validations/roomValidation';
import { Button, Input } from '@nextui-org/react';
import { KeyIcon, UserIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import CurrencyInput from '../shared/Input/CurrencyInput';
import CustomDropdown from '../shared/CustomDropdown';
import CustomCheckboxGroup from '../shared/CustomCheckboxGroup';
import { RoomFormType, RoomInputType } from '@/lib/types/roomTypes';
import { AMENITIES, ROOM_CATEGORIES, ROOM_STATUS } from '@/lib/constants';
import { filterAmenities } from '@/lib/utils/clientHelperFunction';

type DefaultValuesType = {
  name: string;
  description: string;
  address: string;
  capacity: number;
  bedCapacity: number;
};

type RoomFormProps = {
  data: {
    onSubmitHandler: SubmitHandler<RoomInputType>;
    isLoading: boolean;
    isEdit: boolean;
    room?: RoomFormType;
    defaultValues?: DefaultValuesType;
  };
};

const RoomForm = ({ data }: RoomFormProps) => {
  const { onSubmitHandler, isLoading, isEdit, room } = data;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomInputType>({
    resolver: zodResolver(RoomSchema),
    mode: 'onBlur',
    defaultValues: data.defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='p-2 gap-2 place-self-center shadow border rounded-md min-w-[800px]'
    >
      <Input
        className='border-default border-medium rounded-xl'
        label='Name'
        {...register('name')}
        defaultValue={room?.name}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        startContent={<UserIcon className='w-6' />}
      />
      <Input
        className='col-span-2 border-default border-medium rounded-xl'
        label='Description'
        {...register('description')}
        defaultValue={room?.description}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
        startContent={<UserIcon className='w-6' />}
      />
      <Input
        className='col-span-2 border-default border-medium rounded-xl'
        label='Address'
        {...register('address')}
        defaultValue={room?.address}
        errorMessage={errors.address?.message}
        isInvalid={!!errors.address}
        startContent={<UserCircleIcon className='w-6' />}
      />
      <Input
        type='number'
        className='col-span-2 border-default border-medium rounded-xl'
        label='Capacity'
        {...register('capacity')}
        defaultValue={String(room?.capacity)}
        errorMessage={errors.capacity?.message}
        isInvalid={!!errors.capacity}
        startContent={<KeyIcon className='w-6' />}
      />
      <Input
        type='number'
        className='col-span-2 border-default border-medium rounded-xl'
        label='Bed Capacity'
        {...register('bedCapacity')}
        defaultValue={String(room?.bedCapacity)}
        errorMessage={errors.bedCapacity?.message}
        isInvalid={!!errors.bedCapacity}
        startContent={<KeyIcon className='w-6' />}
      />
      <div className='flex flex-col  mb-2'>
        <div className='scale-85 text-default-600 self-start'>Price</div>
        <CurrencyInput
          name='price'
          control={control}
          error={errors.price}
          defaultValue={String(room?.price)}
        />
      </div>
      <div className='flex flex-col mb-2'>
        <div className='scale-85 text-default-600 self-start'>Category</div>
        <CustomDropdown
          name='category'
          control={control}
          items={ROOM_CATEGORIES}
          defaultValue={room?.category}
        />
      </div>
      <div className='flex flex-col mb-2'>
        <div className='scale-85 text-default-600 self-start'>Status</div>
        <CustomDropdown
          name='status'
          control={control}
          items={ROOM_STATUS}
          defaultValue={room?.status}
        />
      </div>
      <CustomCheckboxGroup
        name='amenities'
        control={control}
        options={AMENITIES}
        error={errors.amenities}
        defaultValue={filterAmenities(room?.amenities!)}
      />
      <div className='flex justify-center col-span-2'>
        <Button
          className='w-48'
          color='primary'
          type='submit'
          disabled={isLoading}
        >
          {`${isLoading ? 'Loading...' : isEdit ? 'Edit Room' : 'Create Room'}`}
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
