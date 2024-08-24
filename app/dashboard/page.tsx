"use client";

import React, { use, useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

interface Job {
  _id: string;
  title: string;
  location: string;
  salary: string;
  status: string;
  appliedDate: string;
}

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getJobs");
      const data = await response.json();
      setJobs(data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full dark:text-white text-black  flex flex-col justify-center items-center gap-2">
      {/* <div className="w-[78%] h-[650px] -mt-32"> */}
        <DataTable columns={columns} data={jobs} />
      {/* </div> */}
    </div>
  );
}

export default Home;

// TODO 1: Implement GitHub and Google OAuth login
// TODO 2: Route protection
// TODO 3: ...
