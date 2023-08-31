import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/utils/authOptions';
import Tabs from './_components/Tabs';
import { prisma } from '@/lib/prisma';

export default async function Workout() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
    include: {
      workouts: true,
    },
  });

  const plans = await prisma.plan.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      _count: {
        select: {
          workouts: true,
        },
      },
    },
  });

  const workouts = await prisma.workout.findMany({
    where: {
      userId: user?.id,
      save: true,
    },
    include: {
      _count: {
        select: { exercises: true },
      },
    },
  });

  return (
    <>
      <div className="mx-4 sm:ml-24 xl:ml-[376px] xl:max-w-xl">
        <h2 className="font-header text-stone-50 text-3xl">Quick start</h2>
        <Link href={'/workout-log/new/quick'} key={'new'}>
          <button className="w-full flex items-center justify-center bg-lime-300 rounded-full h-10 font-bold">
            <span className="material-symbols-outlined">add</span>Start new
            workout
          </button>
        </Link>
        <h2 className="font-header text-stone-50 text-3xl mt-6">Workout</h2>
      </div>
      <Tabs workouts={workouts} plans={plans} />
    </>
  );
}
