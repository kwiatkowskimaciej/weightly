'use client';

import ExerciseForm from '@/app/(workouts)/_components/ExerciseForm';
import ExercisesDialog from './ExercisesDialog';
import { useState } from 'react';

interface Props {
  exercises: { id: string; name: string }[];
}

interface Exercise {
  id: string;
  name: string;
}

export default function WorkoutLog({ exercises }: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]);
  return (
    <>
      <ExerciseForm workoutExercises={workoutExercises} />
      <ExercisesDialog
        exercises={exercises}
        setWorkoutExercises={setWorkoutExercises}
      />
    </>
  );
}
