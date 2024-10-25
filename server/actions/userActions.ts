'use server';

import bcrypt from 'bcrypt';
import User from '../mongo/models/user';
import { revalidatePath } from 'next/cache';
import { UserSchema } from '@/lib/validations/userValidation';
import { CreateUserType } from '@/lib/types/userTypes';
import { todayFormatted } from '@/lib/utils/dayjs';

export const registerUser = async (user: CreateUserType) => {
  const { name, email, username, password } = user;
  const validateUser = UserSchema.safeParse(user);

  if (!validateUser.success)
    throw new Error('Validation failed, user is not saved!');

  const newUser = {
    name,
    email,
    username,
    role: 'user',
    image: '',
  };
  const passwordEncrypted = await bcrypt.hash(password!, 10);

  await User.create({
    newUser,
    password: passwordEncrypted,
  });
  revalidatePath('/profile');
  return { email, password };
};

export const getUserWithPasswordByEmail = async (email: string) => {
  const user = await User.findOne({ email: email }).select(
    'name email role username password'
  );
  return user;
};

export const getUserProfileByEmail = async (email: string) => {
  const user = User.findOne({ email: email }).select('-password');
  revalidatePath('/user');
  return user;
};

export const findUserById = async (id: string) => {
  const user = await User.findById(id).select('-password');

  if (!user) throw new Error('User is not found!');

  revalidatePath(`/profile/${id}`);

  return user;
};

export const verifyEmail = async (id: string) => {
  revalidatePath(`/profile/${id}`);
  const userUpdated = await User.findByIdAndUpdate(id, {
    emailVerified: todayFormatted,
  });
  return userUpdated;
};
