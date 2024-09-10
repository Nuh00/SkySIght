import { NextResponse } from "next/server";
import { db } from "@/db";
import { getUniqueUser } from "@/actions/fetchUserInfo";
import { auth } from "@/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // We need to patch a specific job

  // Example of data: Accepted, Rejected, Pending
  const data = await request.json();
  const { status } = data;
  const { id } = params;

  const session = await auth();

  try {
    if (!session?.user?.email) {
      throw new Error("User email is not available");
    }

    const updatedUser = await db.job.update({
      where: {
        id: id,
      },
      data: { status: status },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }
}
