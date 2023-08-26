'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { IWorkout, IWorkoutExercise } from './types';

interface Args {
  data: IWorkout;
  save: boolean;
}

export async function addWorkout({ data, save }: Args) {
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
      name: data.name,
      date: new Date(),
      save: save,
      userId: user.id,
    },
  });

  await prisma.workout.update({
    where: { id: workout.id },
    data: {
      exercises: {
        connect: data.exercises.map((exercise: IWorkoutExercise) => ({
          id: exercise.id,
        })),
      },
    },
  });

  for (const exercise of data.exercises) {
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

export async function getWorkout(workoutId: string): Promise<IWorkout | null> {
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: {
        include: {
          sets: {
            where: {
              workoutId: workoutId,
            },
          },
        },
      },
    },
  });

  return workout || null;
}

export async function getExercises() {
  const exercises = await prisma.exercise.findMany();

  return exercises;
}
