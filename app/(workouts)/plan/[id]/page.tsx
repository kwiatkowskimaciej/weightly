import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PlanTopBar from '../../_components/PlanTopBar';

interface Props {
  params: {
    id: string;
  };
}

export default async function Plan({ params }: Props) {
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

  const plan = await prisma.plan.findUnique({
    where: {
      userId: user?.id,
      id: params.id,
    },
    include: {
      workouts: {
        include: {
          _count: {
            select: { exercises: true },
          },
        },
      },
    },
  });

  return (
    <>
      <PlanTopBar name={plan?.name} />
      <div className="mx-4">
        {plan?.workouts.map((workout, index) => {
          return (
            <WorkoutCard
              key={index}
              exerciseCount={workout._count.exercises}
              {...workout}
            />
          );
        })}
      </div>
    </>
  );
}
