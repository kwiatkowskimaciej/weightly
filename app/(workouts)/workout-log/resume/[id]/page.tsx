import WorkoutLog from '@/app/(workouts)/_components/WorkoutLog';
import { getExercises, resumeWorkout } from '@/app/(workouts)/actions';

interface Props {
  params: {
    id: string;
  };
}

export default async function Continue({ params }: Props) {
  const workoutData = await resumeWorkout(params.id);
  const availableExercises = await getExercises();
  return (
    <>
      <WorkoutLog
        workoutPreload={workoutData}
        exercises={availableExercises}
        start={true}
        inProgress={true}
      />
    </>
  );
}
