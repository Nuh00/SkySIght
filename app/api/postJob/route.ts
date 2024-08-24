import { NextResponse } from "next/server";
import { Job } from "@/app/models/jobModel";

export async function POST(request: Request) {
  const data = await request.json();
  const { title, company, location, salary, status, appliedDate } = data;

  try {
    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      status,
      appliedDate,
    });
    if (!newJob) {
      return NextResponse.json("Error creating job");
    }
    return NextResponse.json("Job created successfully");
  } catch (error) {
    return NextResponse.json("Error creating job");
  }
}

// ** Post request is working
