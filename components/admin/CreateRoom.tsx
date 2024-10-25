'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoomSchema } from '@/lib/validations/roomValidation';
import { RoomInputType } from '@/lib/types/roomTypes';
import { getAmenities } from '@/lib/utils/clientHelperFunction';
import RoomForm from '../room/RoomForm';

const CreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { reset } = useForm<RoomInputType>({
    resolver: zodResolver(RoomSchema),
    mode: 'onBlur',
  });

  const saveRoomHandler: SubmitHandler<RoomInputType> = async (data) => {
    const { status, ...rest } = data;
    const amenities = getAmenities(data.amenities);
    const body = {
      ...rest,
      amenities,
    };

    try {
      setIsLoading(true);

      await fetch('/api/admin/rooms', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      setIsLoading(false);
      toast.success('Room successfully saved.');
      reset();
      router.push('/admin/rooms');
      router.refresh();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <RoomForm
      data={{
        onSubmitHandler: saveRoomHandler,
        isLoading,
        isEdit: false,
        room: undefined,
      }}
    />
  );
};

export default CreateRoom;
