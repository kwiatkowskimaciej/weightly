import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const workout = await prisma.workout.findFirst({
    where: {
      inProgress: true,
    },
  });

  return NextResponse.json(workout);
}
