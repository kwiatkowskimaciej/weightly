'use server';

import { prisma } from '@/lib/prisma';

interface Id {
  id: string;
}

export async function deleteWorkout({ id }: Id) {
  const deleteWorkout = await prisma.workout.delete({
    where: {
      id: id,
    },
  });
}
