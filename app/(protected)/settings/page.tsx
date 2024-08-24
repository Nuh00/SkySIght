import React from "react";
import { auth } from "@/auth";
import { json } from "stream/consumers";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
};

export default SettingsPage;
