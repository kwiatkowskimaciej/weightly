'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Args {
  data: any;
  name: string;
  save: boolean;
}

export async function addWorkout({data, name, save}: Args) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const workout = await prisma.workout.create({
    data: {
      name: name,
      date: new Date(),
      save: save,
      userId: user.id,
    },
  });

  await prisma.workout.update({
    where: { id: workout.id },
    data: {
      exercises: {
        connect: data.map((exercise: any) => ({
          id: exercise.id,
        })),
      },
    },
  });

  for (const exercise of data) {
    await prisma.exercise.update({
      where: { id: exercise.id },
      data: {
        sets: {
          create: exercise.sets.map((set: any) => ({
            workoutId: workout.id,
            weight: set.weight,
            reps: set.reps,
            completed: set.completed,
          })),
        },
      },
    });
  }
}
