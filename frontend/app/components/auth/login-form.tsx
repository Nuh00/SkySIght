"use client";

import React, { useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas/index";
import { FormError } from "@/app/components/form-error";
import { FormSuccess } from "../form-success";
import { FormWarning } from "../form-warning";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginWithCreds } from "@/actions/auth";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [warning, setWarning] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setWarning(undefined);
    startTransition(async () => {
      const result = await loginWithCreds(values);
      if (result.error) {
        setError(result.error);
      } else if (result.warning) {
        setWarning(result.warning);
      } else {
        router.push("/verify-email");
        router.refresh();
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      showSocial={false}
    >
      <Form {...form}>
        <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
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

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormWarning message={warning} />
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Send Verification Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
