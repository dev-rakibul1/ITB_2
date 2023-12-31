import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const createUserValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name should be at least 3 characters long' }),
    role: z.string({}).optional(),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine(value => !!value.trim(), {
        message: 'Password cannot be empty or contain only white spaces',
      }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name should be at least 3 characters long' })
      .optional(),
    role: z.string({}).optional(),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
      })
      .optional(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine(value => !!value.trim(), {
        message: 'Password cannot be empty or contain only white spaces',
      })
      .optional(),
  }),
});

export const userZodValidation = {
  createUserValidation,
  updateUserValidation,
};
