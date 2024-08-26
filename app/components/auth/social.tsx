import React, { startTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { AuthError } from "next-auth";
import { login } from "@/actions/auth";

function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <div className="flex-1">
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => login("github")}
        >
          <FaGithub className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1">
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => login("google")}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Social;
