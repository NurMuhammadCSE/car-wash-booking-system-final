import { z } from "zod";

const loginUser = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const authValidation = {
  loginUser,
};
