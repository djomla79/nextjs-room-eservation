import { z } from 'zod';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../validations/userValidation';

export type CreateUserType = {
  name: string;
  email: string;
  username: string;
  password?: string;
  image?: string;
};

export type UserDetailsType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  emailVerified: string;
  createdAt: string;
};

export type UserSession = {
  id: string;
  role: string;
  email: string;
  username: string;
};

export type RegisterInputType = z.infer<typeof RegisterSchema>;
export type LoginInputType = z.infer<typeof LoginSchema>;
export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;
