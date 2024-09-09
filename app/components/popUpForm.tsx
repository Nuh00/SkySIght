"use client";

import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { addJob } from "@/state/slice";
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

export const PopUpForm = ({
  handleFormModal,
}: {
  handleFormModal: () => void;
}) => {
  const [date, setDate] = useState(new Date());
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const dispatch = useDispatch<AppDispatch>(); // dispatch to redux store

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: 0,
      status: "",
      appliedDate: format(new Date(), "PPP"), // !!
      link: "",
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
        const data = await response.json();
        toast.success("Job created successfully");
        dispatch(addJob(data));

        form.reset();
      } else {
        toast.error("Error creating job");
      }
    });
  };

  return (
    <>
      {/* <Toaster position="top-center" /> */}
      {/* Divs for the backdrop containing the whole card */}
      <div
        className="flex items-center justify-center  h-full w-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md z-50"
        onClick={handleFormModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="min-w-[80%] sm:min-w-[400px] rounded-lg shadow w-[480px] "
        >
          <CardWrapperForm headerLabel="Create a new job">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 text-light-purple h-full py-10"
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
                    {/* < LINK FIELD */}
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter a link to the job"
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
                                    "w-[170px] justify-start text-left font-normal bg-black mb-40"
                                    // !date && "text-muted-foreground"
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
                                  selected={date}
                                  // onSelect={(data) => setDate(data || null)}

                                  onSelect={(date) => {
                                    console.log(`date selected`, date);

                                    if (date) {
                                      field.onChange(format(date, "PPP"));
                                      setDate(date);
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
                  <div className="flex justify-between gap-2 w-full pt-6">
                    <Button
                      onClick={handleFormModal}
                      disabled={isPending}
                      variant={"destructive"}
                      type="submit"
                      size="lg"
                      className="w-full mt-30  "
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
