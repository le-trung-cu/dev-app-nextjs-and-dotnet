import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.passwordConfirm === data.password, {
    message: "password not match",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type User = {
  id: string;
  name: string;
  email: string;
  roles: Array<string>;
  emailConfirmed: boolean;
};

export type AuthenticateType = {
  isSuccess: boolean;
  token: string;
  user: User;
};

export type RegisterResponseType = AuthenticateType;

export type LoginResponseType = AuthenticateType;
