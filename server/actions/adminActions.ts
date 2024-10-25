'use server';

import { revalidatePath } from 'next/cache';
import { CreateRoomType, RoomDetailsType } from '@/lib/types/roomTypes';
import {
  fetchAllRooms,
  createRoom,
  findRoomById,
  updateRoomById,
  deleteRoomById,
} from './roomActions';

export const getAllAdminRooms = async () => {
  return await fetchAllRooms();
};

export const saveRoom = async (room: CreateRoomType) => {
  revalidatePath('/admin/rooms');
  await createRoom(room);
};

export const getRoomById = async (id: string) => {
  const room = await findRoomById(id);

  if (!room) throw new Error('Room is not found!');

  revalidatePath(`/admin/rooms/${id}`);
  return JSON.parse(JSON.stringify(room));
};

export const editRoom = async (id: string, room: RoomDetailsType) => {
  await updateRoomById(id, room);
  revalidatePath(`/admin/rooms/${id}`);
};

export const deleteRoom = async (id: string) => {
  revalidatePath('/admin/rooms');
  await deleteRoomById(id);
};
