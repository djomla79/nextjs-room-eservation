'use server';

import { revalidatePath } from 'next/cache';
import Room from '../mongo/models/room';
import { CreateRoomType, RoomDetailsType } from '@/lib/types/roomTypes';

export const createRoom = async (room: CreateRoomType) =>
  await Room.create(room);

export const updateRoomById = async (id: string, room: RoomDetailsType) => {
  return await Room.findByIdAndUpdate(id, {
    ...room,
  });
};

export const deleteRoomById = async (id: string) =>
  await Room.findByIdAndDelete(id);

export const fetchAllRooms = async () => await Room.find();

export const findRoomById = async (id: string) => {
  const room = await Room.findById(id);

  if (!room) throw new Error('Room is not found!');

  revalidatePath(`/rooms/${id}`);
  return JSON.parse(JSON.stringify(room));
};

export const getRoomById = async (id: string) => {
  const room = await Room.findOne({ _id: id });

  if (!room) throw new Error('Room is not found!');

  revalidatePath(`/room/${id}`);
  return room;
};
