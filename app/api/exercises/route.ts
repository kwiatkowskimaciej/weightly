import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request:Request) {
  const workout = await prisma.workout.findUnique({
    where: {
      id: "cllsjv84q0001r9a544pdzda6",
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  return NextResponse.json(workout)
}