import WorkoutLog from '@/app/(workouts)/_components/WorkoutLog';
import { getExercises, getWorkout } from '@/app/(workouts)/actions';

interface Props {
  params: {
    id: string;
  };
}

export default async function Start({ params }: Props) {
  const workoutData = await getWorkout(params.id);
  const availableExercises = await getExercises();
  return (
    <>
      <WorkoutLog
        workoutPreload={workoutData}
        exercises={availableExercises}
        start={true}
      />
    </>
  );
}
