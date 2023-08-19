'use client'

import ExerciseForm from '@/components/ExerciseForm';
import ExercisesDialog from './ExercisesDialog';
import { useState } from 'react';

interface Props {
  exercises: { id: string; name: string }[];
}

interface Exercise {
  id: number;
  name: string;
}

export default function WorkoutLog({ exercises }: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([])
  return (
    <>
      <ExerciseForm workoutExercises={workoutExercises}/>
      <ExercisesDialog exercises={exercises} setWorkoutExercises={setWorkoutExercises}/>
    </>
  );
}