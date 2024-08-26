import { NextResponse } from "next/server";
// import { Job } from "@/app/models/jobModel";
import { db } from "@/db";

// export async function GET() {
//   const jobs = await Job.find();
//   console.log(jobs);
//   return NextResponse.json(jobs);
// }

// ** Get request is working

export async function GET() {
  try {
    const jobs = await db.job.findMany();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
