"use client";

import { formatSalary } from "@/utils/formatSalary";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { initialJobs } from "@/state/slice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { ColumnDef } from "@tanstack/react-table";
import { columns } from "./columns";

interface Job {
  id: string;
  title: string;
  location: string;
  company: string;
  salary: number;
  status: string;
  appliedDate: string;
}

function Home() {
  const reduxJobs = useSelector((state: RootState) => state.counter.jobs);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession(); // ?? No way this is all I need to get the user session data

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/api/dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session }),
      });

      const data: Job[] = await response.json();

      if (response.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
      if (data) {
        dispatch(initialJobs(data));
      }
    };

    fetchData();
  }, [dispatch, session]);

  return (
    <div className="h-screen w-full dark:text-white text-black  flex flex-col justify-center items-center gap-2">
      {/* <div className="w-[78%] h-[650px] -mt-32"> */}
      <DataTable columns={columns as ColumnDef<Job, any>[]} data={reduxJobs} />
      {/* </div> */}
    </div>
  );
}

export default Home;
