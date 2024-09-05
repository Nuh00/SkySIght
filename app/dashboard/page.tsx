"use client";

import React, { use, useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { initialJobs } from "@/state/slice";

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getJobs");
      const data: Job[] = await response.json(); // initial fetch of jovs
      console.log(data);
      if (data) {
        dispatch(initialJobs(data));
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(reduxJobs);

  return (
    <div className="h-screen w-full dark:text-white text-black  flex flex-col justify-center items-center gap-2">
      {/* <div className="w-[78%] h-[650px] -mt-32"> */}
      <DataTable columns={columns} data={reduxJobs} />
      {/* </div> */}
    </div>
  );
}

export default Home;
