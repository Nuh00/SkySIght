"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };
  return (
    <div className="flex" onClick={handleLogout}>
      <Button variant="destructive" size="lg" disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default Logout;
