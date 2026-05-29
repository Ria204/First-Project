import { z } from "zod";

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ error: "Email is required" }),
    password: z.string({ error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ error: "Refresh token is required." }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ error: "Email is required." }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ error: "Email is required." }),
    newPassword: z.string({ error: "Enter your new password." }),
  }),
});

export const AuthValidations = {
  LoginValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
