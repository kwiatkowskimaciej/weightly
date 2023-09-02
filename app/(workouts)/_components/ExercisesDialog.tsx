'use client';

import ExerciseItem from '@/components/ExerciseItem';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ISet, IWorkout, IWorkoutExercise } from '../types';
import Link from 'next/link';

interface Exercise {
  id: string;
  name: string;
  image: string | null;
  video: string | null;
  type: string;
}

interface Props {
  exercises: Exercise[];
  workout: IWorkout;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
}

export default function ExercisesDialog({ workout, setWorkout }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  let [isOpen, setIsOpen] = useState(false);
  let [chosen, setChosen] = useState<Exercise[]>([]);

  const addExercises = () => {
    const updatedWorkout: IWorkout = { ...workout };

    for (const exercise of chosen) {
      const newSet: ISet = {
        id: '',
        date: new Date(),
        reps: null,
        weight: null,
        addWeight: null,
        subtractWeight: null,
        time: null,
        distance: null,
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
          <div className="w-full flex items-center justify-between">
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
            <Link
              href={'/exercise/create'}
              className={twMerge(
                'flex items-center bg-stone-800 px-6 rounded-full h-10 font-bold text-stone-50'
              )}
            >
              Create
            </Link>
          </div>
        </div>
        <div>
          {exercises.map((exercise) => {
            return (
              <div
                key={exercise.id}
                className={twMerge(chosen.some((item) => item.id === exercise.id) ? 'ease-out translate-x-8' : '', 'transition-all flex items-center')}
                onClick={() => {
                  if (chosen.some((item) => item.id === exercise.id)) {
                    const updatedList = chosen.filter(
                      (item) => item.id !== exercise.id
                    );
                    setChosen(updatedList);
                  } else {
                    setChosen((prevExercises) => [
                      ...prevExercises,
                      {
                        id: exercise.id,
                        name: exercise.name,
                        image: exercise.image,
                        video: exercise.video,
                        type: exercise.type,
                      },
                    ]);
                  }
                }}
              >
                <div className={twMerge(chosen.some((item) => item.id === exercise.id) ? 'bg-lime-300 w-2 h-16 rounded-full' : 'hidden',)}></div>
                <ExerciseItem {...exercise} />
              </div>
            );
          })}
        </div>
        <div className="px-4 w-full absolute bottom-4">
          <button
            className={twMerge(
              chosen.length === 0 ? 'hidden' : 'flex',
              'w-full items-center justify-center bg-lime-900 rounded-full h-10 font-bold text-stone-50'
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
