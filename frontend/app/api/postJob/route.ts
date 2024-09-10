import { NextResponse } from "next/server";
import { db } from "@/db";
import { getUniqueUser } from "@/actions/fetchUserInfo";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const data = await request.json();
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User email is not available");
  }
  const user = await getUniqueUser(session.user?.email);
  const userId = user?.id as string;
  const { title, company, location, salary, status, appliedDate, link } = data;

  try {
    const newJob = await db.job.create({
      data: {
        title,
        company,
        location,
        salary,
        status,
        appliedDate,
        userId,
        link,
      },
    });
    if (!newJob) {
      return NextResponse.json("Error creating job");
    }
    return NextResponse.json(newJob);
  } catch (error) {
    return NextResponse.json("Error creating job");
  }
}

// ** Post request is working
