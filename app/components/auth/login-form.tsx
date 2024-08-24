"use client";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas/index";
import { FormError } from "@/app/components/form-error";
import { FormSuccess } from "../form-success";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Social from "./social";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "../../../actions/login";
import { github } from "@/actions/github";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  // const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    // setSuccess(undefined);
    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          if (data.error) {
            setError(data.error);
          }
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Dont have an account? Register"
      backButtonHref="/register"
      showSocial={false}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          {/* <FormSuccess message={success} /> */}
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
