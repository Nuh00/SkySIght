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

// "use client";

// import React, { useEffect, useState } from "react";
// import { DataTable } from "./data-table";
// import { columns } from "./columns";
// import { auth } from "@/auth";

// interface Job {
//   _id: string;
//   title: string;
//   location: string;
//   salary: number;
//   status: string;
//   appliedDate: string;
// }

// function Home() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const session = await auth();
//       if (!session?.user?.email) {
//         window.location.href = "/login";
//         return;
//       }

//       const user = await getUniqueUser(session.user.email);
//       if (!user) {
//         window.location.href = "/login";
//         return;
//       }

//       const response = await fetch(`/api/getJobs?userId=${user.id}`);
//       const data = await response.json();
//       setJobs(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="h-screen w-full dark:text-white text-black flex flex-col justify-center items-center gap-2">
//       <DataTable columns={columns} data={jobs} />
//     </div>
//   );
// }

// export default Home;
