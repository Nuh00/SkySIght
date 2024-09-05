import { NextResponse } from "next/server";
import { db } from "@/db";

export async function DELETE(
  request: Request, { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedJob = await db.job.deleteMany({
      where: {
        id: id,
      },
    });
    if (deletedJob.count === 0) {
      return NextResponse.json({ message: "Job not found" });
    }


    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Job not found" });
  }
}

// ** Delete request is working
