'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Exercise {
  name: string;
  imgUrl: string;
  videoUrl: string;
  type: string;
}

interface ExerciseData {
  exerciseData: Exercise;
}


export async function createExercise({ exerciseData }: ExerciseData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const exercise = await prisma.exercise.create({
    data: {
      name: exerciseData.name,
      image: exerciseData.imgUrl,
      video: exerciseData.videoUrl,
      type: exerciseData.type,
    },
  });
}
