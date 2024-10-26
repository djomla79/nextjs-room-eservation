'use client';

import EditRoom from '../admin/EditRoom';
import { RoomDetailsType } from '@/lib/types/roomTypes';
import RoomCard from './RoomCard';
import CustomCarousel from '../shared/CustomCarousel';

type RoomDetailsProps = {
  room: RoomDetailsType & { _id: string };
  isEdit?: boolean;
  isAdmin?: boolean;
};

// TODO: finish functionality for images
const RoomDetails = ({ room, isEdit, isAdmin }: RoomDetailsProps) => {
  const { images } = room;
  if (isEdit) return <EditRoom room={room} />;
  return (
    <div className='flex'>
      <RoomCard room={room} isAdmin={isAdmin} />
      {images !== undefined && images?.length > 0 ? (
        <CustomCarousel images={images} />
      ) : (
        <div className='flex justify-center items-center ml-1 rounded-xl shadow min-w-[500px] bg-white'>
          <span>Image Placeholder</span>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
