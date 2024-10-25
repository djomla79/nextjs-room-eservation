'use client';

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import ReservationModal from '../reservation/ReservationModal';
import { RoomDetailsType } from '@/lib/types/roomTypes';

type RoomCardProps = {
  room: RoomDetailsType & { _id: string };
  isAdmin: boolean | undefined;
};

const RoomCard = ({ room, isAdmin }: RoomCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    _id: roomId,
    name,
    description,
    status,
    address,
    price,
    category,
    capacity,
    bedCapacity,
    occupancy,
    amenities,
  } = room;

  return (
    <Card>
      <CardHeader className='flex gap-3 justify-center'>
        <div className='flex justify-center'>{`${name}`}</div>
      </CardHeader>
      <Divider />
      <CardBody className='flex justify-center p-5'>
        <div>{`Description: ${description}`}</div>
        <div>{`Address: ${address}`}</div>
        <div>{`Price: ${price}`}</div>
        <div>{`Category: ${category}`}</div>
        <div>{`Status: ${status}`}</div>
        <div>{`Capacity: ${capacity}`}</div>
        <div>{`Bed Capacity: ${bedCapacity}`}</div>
        <div>{`Occupancy: ${occupancy}`}</div>
        <div className='flex'>
          <div className='mr-1'>{`Internet: ${
            amenities.isInternet ? 'Yes' : 'No'
          }`}</div>
          {amenities.isInternet ? (
            <CheckCircleIcon className='w-5' />
          ) : (
            <XCircleIcon className='w-5' />
          )}
        </div>
        <div className='flex'>
          <div className='mr-1'>{`Breakfast: ${
            amenities.isBreakfast ? 'Yes' : 'No'
          }`}</div>
          {amenities.isBreakfast ? (
            <CheckCircleIcon className='w-5' />
          ) : (
            <XCircleIcon className='w-5' />
          )}
        </div>
        <div className='flex'>
          <div className='mr-1'>{`Pets: ${
            amenities.isPets ? 'Yes' : 'No'
          }`}</div>
          {amenities.isPets ? (
            <CheckCircleIcon className='w-5' />
          ) : (
            <XCircleIcon className='w-5' />
          )}
        </div>
      </CardBody>
      {!isAdmin && (
        <CardFooter className='flex justify-center'>
          {status === 'Available' ? (
            <Button onPress={onOpen}>Make Reservation</Button>
          ) : (
            <div>Room is not available at the moment</div>
          )}
          <ReservationModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            roomId={roomId}
            roomPrice={price}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default RoomCard;
