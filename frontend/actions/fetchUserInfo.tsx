"use server";

import { prisma } from "@/db";
import { NextResponse } from "next/server";

export const getUniqueUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
    },
  });

  return user;
};

export const getUserJobs = async (userId: string) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
