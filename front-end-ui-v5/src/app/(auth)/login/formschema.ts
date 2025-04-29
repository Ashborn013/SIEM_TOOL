import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address " }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must not exceed 32 characters" }),
});

// Example usage:
// const result = loginFormSchema.safeParse({ email: "test@example.com", password: "password123" });
// if (!result.success) {
//   console.log(result.error.errors);
// }