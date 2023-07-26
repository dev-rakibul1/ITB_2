"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, { message: 'Name should be at least 3 characters long' }),
        role: zod_1.z.string({}).optional(),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email format' })
            .refine(value => emailRegex.test(value), {
            message: 'Invalid email address',
        }),
        password: zod_1.z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .refine(value => !!value.trim(), {
            message: 'Password cannot be empty or contain only white spaces',
        }),
    }),
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, { message: 'Name should be at least 3 characters long' })
            .optional(),
        role: zod_1.z.string({}).optional(),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email format' })
            .refine(value => emailRegex.test(value), {
            message: 'Invalid email address',
        })
            .optional(),
        password: zod_1.z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .refine(value => !!value.trim(), {
            message: 'Password cannot be empty or contain only white spaces',
        })
            .optional(),
    }),
});
exports.userZodValidation = {
    createUserValidation,
    updateUserValidation,
};
