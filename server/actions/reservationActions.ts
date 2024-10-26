'use server';

import { revalidatePath } from 'next/cache';
import Reservation from '../mongo/models/reservation';
import { ReservationType } from '@/lib/types/reservationTypes';
import { getCookieHeaders } from '@/lib/utils/serverHelperFunctions';
import { BASE_URL } from '@/lib/constants';
import { parseStringToDate } from '@/lib/utils/dayjs';

export const saveReservation = async (reservation: ReservationType) => {
  await Reservation.create(reservation);
  revalidatePath('/reservations');
};

export const sendSaveReservation = async (body: any) => {
  const cookie = getCookieHeaders();

  await fetch(`${BASE_URL}/api/reservations`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: cookie.headers,
    cache: 'no-store',
  });
};

export const getAllReservations = async (path: string) => {
  revalidatePath(path);
  return await Reservation.find();
};

export const getLatestCheckInOutDates = async (roomId: string) => {
  let latestCheckInOutDates: Date[] = [];
  let reservation = undefined;

  if (roomId !== undefined && roomId !== '') {
    const roomIdTemp = roomId;
    reservation = await Reservation.findOne({ room: roomIdTemp })
      .sort({ checkIn: -1 })
      .exec();
  }

  if (reservation)
    latestCheckInOutDates = [
      parseStringToDate(reservation.checkIn),
      parseStringToDate(reservation.checkOut),
    ];

  return latestCheckInOutDates;
};
