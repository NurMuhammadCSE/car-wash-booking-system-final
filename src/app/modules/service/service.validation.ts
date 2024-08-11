import { z } from "zod";

const createService = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number"),
    duration: z.number().positive("Duration must be a positive number"),
    isDeleted: z.boolean().default(false),
  }),
});

const updatedService = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    duration: z.number().positive("Duration must be a positive number").optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const serviceValidation = {
  createService,
  updatedService
};
