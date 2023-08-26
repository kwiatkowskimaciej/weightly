import { prisma } from '@/lib/prisma';
import WorkoutLog from '../../../_components/WorkoutLog';

export default async function Quick() {
  const exercises = await prisma.exercise.findMany();

  return (
    <div className="absolute top-0 w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutLog exercises={exercises} start={true} />
    </div>
  );
}
