import { z } from "zod";



export const LoginSchema = z.object({
  email: z.string().email(),
  // password: z.string().min(6, {
  //   message: "Password is required",
  // }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  name: z.string().min(2, {
    message: "Name is required",
  }),
});

export const createJobSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  company: z.string().min(2, {
    message: "Company is required",
  }),
  location: z.string().min(2, {
    message: "Location is required",
  }),
  salary: z.coerce
    .number()
    .int()
    .min(3, {
      message: "Salary is required",
    })
    .max(1000000000, {
      message: "Send me some money",
    }),

  appliedDate: z.string().optional(),
  link: z.string().min(2, {}).optional(),
});
