import { NextResponse } from "next/server";
import { Job } from "@/app/models/jobModel";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedJob = await Job.findOneAndDelete({ _id: id });
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Job not found" });
  }
}

// ** Delete request is working
