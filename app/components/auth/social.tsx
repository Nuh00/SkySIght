
import React, { startTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { google } from "@/actions/google";
import { github } from "@/actions/github";
import { useTransition } from "react";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

function Social() {
  const googleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await google();
      window.location.href = result;
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(`Error cause is...: ${error.cause?.err?.message}`);
        return { error: error.cause?.err?.message };
      }
    }
  };

  const githubSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const results = await github()
      console.log(results);
      window.location.href = results;
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(`Error cause is...: ${error.cause?.err?.message}`);
        return { error: error.cause?.err?.message };
      }
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <form onSubmit={googleSubmit}>
        <Button size="lg" variant="outline" className="w-full">
          <FcGoogle className="h-5 w-5" />
        </Button>
      </form>

      <form onSubmit={githubSubmit}>
        <Button size="lg" variant="outline" className="w-full">
          <FaGithub className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

export default Social;
