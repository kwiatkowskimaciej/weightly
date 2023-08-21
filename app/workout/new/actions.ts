'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function addWorkout(data: any) {
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
    throw new Error("User not found");
  }

  const log = JSON.stringify(data);

  const workout = await prisma.workout.create({
    data: {
      log: log,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  redirect('/workout');
}
