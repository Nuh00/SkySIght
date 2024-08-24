"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useTransition } from "react";
import { createJobSchema } from "../schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/app/components/form-error";
import { FormSuccess } from "@/app/components/form-success";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapperForm from "./card-wrapper-form";
import { set } from "mongoose";

export const PopUpForm = ({
  handleFormModal,
}: {
  handleFormModal: () => void;
}) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: 0,
      status: "",
      appliedDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createJobSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    
    startTransition(async () => {
      console.log(values);

      const response = await fetch("/api/postJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Job created successfully");
        
        form.reset();
      } else {
        toast.error("Error creating job");
      }
    });
  };

  return (
    <>
        <Toaster position="top-center" />
        {/* Divs for the backdrop containing the whole card */}
      <div
        className="flex items-center justify-center  h-full w-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md z-50"
        onClick={handleFormModal}
      >
        {/* <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow px-16 w-[30%]"
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          onClick={handleFormModal} // stops the event from executing the parent onClick
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="#c6c7c7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close popup</span>
        </button>

        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              Login to your account
            </p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
              You must be logged in to perform this action.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-[18px] w-[18px] "
              />
              Continue with GitHub
            </button>

            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
              />
              Continue with Google
            </button>

            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="Google"
                className="h-[18px] w-[18px] "
              />
              Continue with LinkedIn
            </button>
          </div>

          <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            OR
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          <form className="w-full">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Email Address"
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Password"
            />
            <p className="mb-3 mt-2 text-sm text-gray-500">
              <a
                href="/forgot-password"
                className="text-blue-800 hover:text-blue-600"
              >
                Reset your password?
              </a>
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?
            <a href="/signup" className="font-medium text-[#4285f4]">
              Sign up
            </a>
          </div>
        </div>
      </div> */}

        <div
          onClick={(e) => e.stopPropagation()}
          className="min-w-[80%] sm:min-w-[400px] rounded-lg shadow w-[400px] "
        >
          <CardWrapperForm headerLabel="Create a new job">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 text-light-purple h-full"
              >
                <main className="h-full flex flex-col items-center justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between gap-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Input
                                  className="text-light-purple"
                                  {...field}
                                  placeholder="Enter role"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter company"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-950">
                                  <SelectItem
                                    className="text-green-500 hover:text-green-500/90"
                                    value="Accepted"
                                  >
                                    Accepted
                                  </SelectItem>
                                  <SelectItem
                                    className="text-red-500 hover:text-red-500/90"
                                    value="Rejected"
                                  >
                                    Rejected
                                  </SelectItem>
                                  <SelectItem
                                    className="text-gray-500"
                                    value="Pending"
                                  >
                                    Pending
                                  </SelectItem>
                                  <SelectItem
                                    className="text-gray-500"
                                    value="Ghosted"
                                  >
                                    Ghosted
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="salary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Salary</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Salary"
                                  type="number"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter location"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appliedDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[170px] justify-start text-left font-normal bg-black mb-40",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto flex flex-col bg-black text-white "
                                align="start"
                                side="top"
                              >
                                <Calendar
                                  mode="single"
                                  selected={date || new Date()}
                                  // onSelect={(data) => setDate(data || null)}
                                  onSelect={(date) => {
                                    setDate(date || null);
                                    if (date) {
                                      field.onChange(
                                        format(date, "PPP") || null
                                      );
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <div className="flex justify-between gap-2 w-full">
                    <Button
                      onClick={handleFormModal}
                      disabled={isPending}
                      variant={"destructive"}
                      type="submit"
                      size="lg"
                      className="w-full mt-30 "
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isPending}
                      type="submit"
                      variant={"ghost"}
                      size="lg"
                      className="w-full mt-30 border border-white "
                    >
                      +Add
                    </Button>
                  </div>
                </main>
              </form>
            </Form>
          </CardWrapperForm>
        </div>
      </div>
    </>
  );
};

// function CreateJob() {
//   const [showForm, setShowForm] = useState(false);

//   const handleFormModal = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div>
//       <button onClick={handleFormModal}></button>

//       {showForm && <PopUpForm handleFormModal={handleFormModal} />}
//     </div>
//   );
// }

// export default CreateJob;
