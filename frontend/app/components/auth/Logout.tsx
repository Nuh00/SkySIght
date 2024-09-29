"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const Logout = () => {
  return (
    <div className="flex" onClick={() => logout()}>
      <Button variant="destructive" size="lg" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;


