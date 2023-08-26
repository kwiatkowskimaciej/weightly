'use client';

import ExerciseForm from '@/app/(workouts)/_components/ExerciseForm';
import ExercisesDialog from './ExercisesDialog';
import { useState } from 'react';
import WorkoutTopBar from './WorkoutTopBar';
import { IWorkout } from '../types';

interface Exercise {
  id: string;
  name: string;
}

interface Props {
  workoutPreload?: IWorkout | null;
  exercises: Exercise[];
  start: boolean;
}

const emptyWorkout: IWorkout = {
  id: '',
  name: '',
  exercises: [],
  date: new Date(),
  save: false,
  userId: '',
  planId: null,
};

export default function WorkoutLog({
  workoutPreload,
  exercises,
  start,
}: Props) {
  const [workout, setWorkout] = useState(workoutPreload || emptyWorkout);
  return (
    <>
      <WorkoutTopBar workout={workout} start={start} />
      <ExerciseForm workout={workout} setWorkout={setWorkout} start={start} />
      <ExercisesDialog
        exercises={exercises}
        workout={workout}
        setWorkout={setWorkout}
      />
    </>
  );
}
