import mongoose, { Document, Schema } from 'mongoose';
import { todayFormatted } from '@/lib/utils/dayjs';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  emailVerified: string;
  image: string;
  createdAt: string;
  role: string;
}

export const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  emailVerified: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: String,
    default: todayFormatted,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
