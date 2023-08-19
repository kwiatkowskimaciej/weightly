'use client';

import ExerciseItem from '@/components/ExerciseItem';
import { useState } from 'react';

interface WorkoutExercisesSet {
  id: number;
  name: string;
}

interface Props {
  exercises: { id: string; name: string }[];
  setWorkoutExercises: React.Dispatch<
    React.SetStateAction<WorkoutExercisesSet[]>
  >;
}

export default function ExercisesDialog({
  exercises,
  setWorkoutExercises,
}: Props) {
  let [isOpen, setIsOpen] = useState(false);
  let [choosen, setChoosen] = useState([]);

  return (
    <>
      <div className="mx-4 mt-6">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center bg-lime-900 rounded-full h-10 font-bold mt-2"
        >
          <span className="material-icons-outlined">add</span>Add exercise
        </button>
      </div>

      <div
        className={`fixed w-full h-full top-0 bg-stone-900 ${
          !isOpen && 'hidden'
        }`}
      >
        <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
          <div className="flex items-center gap-4">
            <button
              className="material-icons-outlined"
              onClick={() => setIsOpen(false)}
            >
              close
            </button>
            <span className="font-header text-2xl mt-1">Add exercise</span>
          </div>
        </div>
        <div>
          {exercises.map((exercise) => {
            return (
              <div>
                <ExerciseItem {...exercise} />
              </div>
            );
          })}
        </div>
        <button className={`${choosen.length === 0 && 'hidden'}`}>
          Add exercises
        </button>
      </div>
    </>
  );
}
