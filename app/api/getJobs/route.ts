import { NextResponse } from "next/server";
import { Job } from "@/app/models/jobModel";

export async function GET() {
  const jobs = await Job.find();
  console.log(jobs);
  return NextResponse.json(jobs);
}

// ** Get request is working
