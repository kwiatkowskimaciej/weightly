'use client';

import ExerciseItem from '@/components/ExerciseItem';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ISet, IWorkout, IWorkoutExercise } from '../types';

interface Exercise {
  id: string;
  name: string;
}

interface Props {
  exercises: Exercise[];
  workout: IWorkout;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
}

export default function ExercisesDialog({
  exercises,
  workout,
  setWorkout,
}: Props) {
  let [isOpen, setIsOpen] = useState(false);
  let [chosen, setChosen] = useState<Exercise[]>([]);

  const addExercises = () => {
    const updatedWorkout: IWorkout = { ...workout };

    for (const exercise of chosen) {
      const newSet: ISet = {
        id: '',
        weight: 0,
        reps: 0,
        completed: false,
        exerciseId: exercise.id,
        workoutId: workout.id,
      };

      const newExercise: IWorkoutExercise = {
        ...exercise,
        sets: [newSet],
      };
      updatedWorkout.exercises.push(newExercise);
    }

    setWorkout(updatedWorkout);

    setChosen([]);
    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-4 mt-6 text-stone-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center bg-lime-900 rounded-full h-10 font-bold mt-2"
        >
          <span className="material-icons-outlined">add</span>Add exercise
        </button>
      </div>

      <div
        className={twMerge(
          'fixed w-full h-full top-0 bg-stone-900',
          !isOpen && 'hidden'
        )}
      >
        <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
          <div className="flex items-center gap-4">
            <button
              className="material-icons-outlined"
              onClick={() => {
                setIsOpen(false);
                setChosen([]);
              }}
            >
              close
            </button>
            <span className="font-header text-2xl mt-1">Add exercise</span>
          </div>
        </div>
        <div>
          {exercises.map((exercise) => {
            return (
              <div
                key={exercise.id}
                onClick={() => {
                  if (chosen.some((item) => item.id === exercise.id)) {
                    const updatedList = chosen.filter(
                      (item) => item.id !== exercise.id
                    );
                    setChosen(updatedList);
                  } else {
                    setChosen((prevExercises) => [
                      ...prevExercises,
                      { id: exercise.id, name: exercise.name },
                    ]);
                  }
                }}
              >
                <ExerciseItem {...exercise} />
              </div>
            );
          })}
        </div>
        <div className="px-4 w-full absolute bottom-4">
          <button
            className={twMerge(
              chosen.length === 0 && 'hidden',
              'w-full flex items-center justify-center bg-lime-900 rounded-full h-10 font-bold'
            )}
            onClick={() => addExercises()}
          >
            Add {chosen.length} exercise{chosen.length > 1 ? 's' : null}
          </button>
        </div>
      </div>
    </>
  );
}
