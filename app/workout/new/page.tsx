import ExerciseForm from '@/components/ExerciseForm';
import WorkoutTopBar from '@/components/WorkoutTopBar';
import { prisma } from '@/lib/prisma';
import WorkoutLog from './WorkoutLog';

export default async function NewWorkout() {
  const exercises = await prisma.exercise.findMany();
  return (
    <div className="absolute top-0 w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutTopBar />
      {/* <div className="px-4">
        <div className="border-b border-stone-800 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-500"></div>
            <div className="text-stone-50">Running</div>
          </div>
          <ExerciseForm />
        </div>
      </div> */}
      <WorkoutLog exercises={exercises} />
    </div>
  );
}
