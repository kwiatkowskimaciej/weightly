import { getExercises } from '@/app/(workouts)/actions';
import WorkoutLog from '../../../_components/WorkoutLog';

export default async function Quick() {
  const exercises = await getExercises();

  return (
    <div className="absolute top-0 w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutLog exercises={exercises} start={true} />
    </div>
  );
}
