import ExerciseForm from '@/components/ExerciseForm';
import WorkoutTopBar from '@/components/WorkoutTopBar';
import { prisma } from '@/lib/prisma';
import WorkoutLog from './WorkoutLog';

export default async function NewWorkout() {
  const exercises = await prisma.exercise.findMany();
  return (
    <div className="absolute top-0 w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutTopBar />
      <WorkoutLog exercises={exercises} />
    </div>
  );
}
