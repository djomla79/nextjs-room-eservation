import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';
import { IRoom } from './room';
import { todayFormatted } from '@/lib/utils/dayjs';

export interface IReservation extends Document {
  room: IRoom;
  user: IUser;
  checkIn: string;
  checkOut: string;
  stayDuration: number;
  bill: number;
  isBillPaid: boolean;
  billPaidAt: string;
  createdAt: string;
}

const reservationSchema: Schema<IReservation> = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  stayDuration: {
    type: Number,
  },
  bill: {
    type: Number,
  },
  isBillPaid: {
    type: Boolean,
  },
  billPaidAt: {
    type: String,
  },
  createdAt: {
    type: String,
    default: todayFormatted,
  },
});

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>('Reservation', reservationSchema);
