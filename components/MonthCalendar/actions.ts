'use server'

import { prisma } from "@/lib/prisma";

export async function getWorkoutsDates() {
  const workoutDates = await prisma.workout.findMany({
    select: {
      date: true,
    },
  });

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dates = workoutDates.map((workout) =>
    workout.date.toLocaleString(undefined, options as Intl.DateTimeFormatOptions)
  );

  return dates
}