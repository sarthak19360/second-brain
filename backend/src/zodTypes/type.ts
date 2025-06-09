import { z } from "zod/v4";
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Max 10 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_\-])[A-Za-z\d@$!%*#?&^_\-]{8,}$/,
      "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Max 10 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_\-])[A-Za-z\d@$!%*#?&^_\-]{8,}$/,
      "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});

export const contentSchema = z.object({
  link: z.string(),
  type: z.enum([
    "article",
    "video",
    "image",
    "audio",
    "document",
    "tweet",
    "youtube",
    "link",
  ]),
  title: z.string(),
  tags: z.array(z.string()),
});
