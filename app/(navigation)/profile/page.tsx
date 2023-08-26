import AuthCheck from '@/components/AuthCheck';
import { SignInButton, SignOutButton } from '@/components/buttons';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { authOptions } from '@/lib/utils/authOptions';

export default async function Profile() {
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

  const workouts = await prisma.workout.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      _count: {
        select: { exercises: true },
      },
    },
  });
  return (
    <div className="m-4 sm:ml-24 xl:ml-[376px]">
      <div className="flex gap-3">
        <Image src="/10.png" width={104} height={104} alt="Profile picture" />
        <div>
          <p className="text-stone-50 font-header text-3xl">{user?.name}</p>
          <p className="text-stone-50 mb-2">@{user?.id.slice(-8)}</p>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </div>
      </div>
      <div className="mt-6 mb-20">
        <p className="text-stone-50 font-header text-3xl">Last workouts</p>
        {workouts.map((workout) => {
          return (
            <>
              <WorkoutCard
                key={workout.id}
                exerciseCount={workout._count.exercises}
                {...workout}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
