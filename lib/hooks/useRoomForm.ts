'use client';

import { useState, useEffect } from 'react';
import { filterAmenities } from '../utils/clientHelperFunction';
import { RoomFormType } from '../types/roomTypes';

type Props = {
  room: RoomFormType | undefined;
};

const useRoomForm = ({ room }: Props) => {
  const [roomData, setRoomData] = useState<RoomFormType>();
  const [amenitiesDefault, setAmenitiesDefault] = useState<string[]>([]);

  useEffect(() => {
    if (room) {
      setRoomData(room);
      setAmenitiesDefault(filterAmenities(room.amenities));
    }
  }, [room]);

  return { roomData, amenitiesDefault };
};

export default useRoomForm;
