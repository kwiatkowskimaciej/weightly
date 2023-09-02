'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { IWorkout, IWorkoutExercise } from './types';

interface Args {
  data: IWorkout;
  save: boolean;
  inProgress?: boolean;
}

export async function addWorkout({ data, save, inProgress }: Args) {
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

  const exisitngWorkout = await prisma.workout.findUnique({
    where: {
      id: data.id,
    },
  });

  if (exisitngWorkout) {
    await prisma.workout.delete({
      where: { id: exisitngWorkout.id },
    });
  }

  const workout = await prisma.workout.create({
    data: {
      name: data.name,
      date: new Date(),
      save: save,
      inProgress: inProgress || false,
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
            date: workout.date,
            weight: set.weight,
            reps: set.reps,
            completed: set.completed,
            userId: user.id,
          })),
        },
      },
    });
  }
}

export async function updateWorkout({ data }: { data: IWorkout }) {
  const workout = await prisma.workout.findUnique({
    where: {
      id: data.id,
    },
  });

  if (workout) {
    await prisma.workout.delete({
      where: { id: workout.id },
    });
  }

  addWorkout({ data: data, save: false, inProgress: true });
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

export async function resumeWorkout(
  workoutId: string
): Promise<IWorkout | null> {
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
      inProgress: true,
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

  return workout;
}

export async function getExercises() {
  const exercises = await prisma.exercise.findMany();
  return exercises;
}
