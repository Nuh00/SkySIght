import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";
import { getUniqueUser } from "@/actions/fetchUserInfo";
import { cookies } from 'next/headers'

// ** Get request is working

export async function GET() {
  const session = await auth();
  const data = session?.user
  // Send session to express server




  console.log(`Serverless function session info: `,session);
  if (!session?.user?.email) {
    throw new Error("User email is not available");
  }
  try {
    const user = await getUniqueUser(session.user.email);
    const jobs = await db.job.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
