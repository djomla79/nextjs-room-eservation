'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import { RoomInputType } from '@/lib/types/roomTypes';
import { getAmenities } from '@/lib/utils/clientHelperFunction';
import { RoomDetailsType } from '@/lib/types/roomTypes';
import RoomForm from '../room/RoomForm';

type EditRoomProps = {
  room: RoomDetailsType & { _id: string };
};

const EditRoom = ({ room }: EditRoomProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: room.name,
    description: room.description,
    address: room.address,
    capacity: room.capacity,
    bedCapacity: room.bedCapacity,
  };

  const editRoomHandler: SubmitHandler<RoomInputType> = async (data) => {
    const amenities = getAmenities(data.amenities);
    const body = {
      ...data,
      id: room._id,
      amenities,
    };

    try {
      setIsLoading(true);

      await fetch(`/api/admin/rooms`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });

      setIsLoading(false);
      toast.success('Room successfully updated.');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <RoomForm
      data={{
        onSubmitHandler: editRoomHandler,
        isLoading,
        isEdit: true,
        room,
        defaultValues,
      }}
    />
  );
};

export default EditRoom;
