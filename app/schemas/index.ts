import { link } from "fs";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is required",
  }),
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
  salary: z.coerce.number().min(1, {
    message: "Salary is required",
  }),
  status: z.string().min(2, {
    message: "Status is required",
  }),
  appliedDate: z.string().min(2, {
    message: "Applied Date is required",
  }),
  link: z.string().min(2, {}).optional(),
});
