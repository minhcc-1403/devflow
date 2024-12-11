import { z } from "zod";

export const CreateUserSchema = z.object({
  fullName: z.string({ required_error: "FullName is required" }),
  phone: z.string().optional(),
  username: z.string(),
  email: z.string().email().optional(),
  dateBirth: z.date().optional(),
  gender: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial();
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
