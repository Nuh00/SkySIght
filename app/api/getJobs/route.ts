import { NextResponse } from "next/server";
import { db } from "@/db";



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
