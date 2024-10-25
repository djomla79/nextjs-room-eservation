import { z } from 'zod';

export const RoomSchema = z.object({
  name: z
    .string()
    .min(2, 'Last name must be at least 2 characters!')
    .max(40, 'Last name must be less than 40 characters!')
    .regex(
      new RegExp('^[a-zA-Z0-9 ]+$'),
      'No special characters, except spaces, allowed!'
    )
    .refine((data) => data.trim() === data, {
      message: 'Can not have spaces at the beginning or at the end.',
    }),
  description: z
    .string()
    .min(1, 'Description must not be empty!')
    .max(100, 'Description must be less than 100 characters!')
    .refine((data) => data.trim() === data, {
      message: 'Can not have spaces at the beginning or at the end.',
    }),
  address: z
    .string()
    .min(1, 'Address must not be empty!')
    .max(100, 'Username must be less than 100 characters!')
    .regex(
      new RegExp('^[a-zA-Z0-9 ,]+$'),
      'No special characters, except spaces and comas, allowed!'
    )
    .refine((data) => data.trim() === data, {
      message: 'Must not have spaces at the beginning or at the end.',
    }),
  price: z
    .string({ required_error: 'Please enter price value!' })
    .min(1, 'Please enter price value!')
    .transform((data) => Number(data.replace(/[^\d.]/g, '')))
    .refine(
      (data) => {
        return data >= 50;
      },
      {
        message: 'Please enter price of min 50€',
      }
    )
    .refine(
      (data) => {
        const match = /(\d+(\.\d{1,2})?)\s?€$/.exec(`${data}€`);

        if (!match) return false;

        const enteredNumber = parseFloat(match[1]);
        return enteredNumber > 0 && enteredNumber <= 5000;
      },
      {
        message:
          'Price must be in € X or € X.XX format and should not exceed 5000.00€!',
      }
    ),
  category: z.coerce.string(),
  status: z.coerce.string(),
  capacity: z.coerce
    .number()
    .positive('Please enter at least one person!')
    .max(6, 'You can enter six people max!')
    .int('Number must not have decimals!'),
  // occupancy: z.coerce
  //   .number()
  //   .positive('Please enter at least one person!')
  //   .max(6, 'You can enter six people max!')
  //   .int('Number must not have decimals!'),
  bedCapacity: z.coerce
    .number()
    .positive('Please enter at least one bed!')
    .max(3, 'You can enter three beds max!')
    .int('Number must not have decimals!'),
  amenities: z.array(z.string()),
});
