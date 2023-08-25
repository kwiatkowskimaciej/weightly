'use client';

import React, { useState, useEffect } from 'react';
import WorkoutTopBar from './WorkoutTopBar';
import { twMerge } from 'tailwind-merge';
import ExerciseItem from '@/components/ExerciseItem';
import { title } from 'process';

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface Set {
  id: number;
  completed: boolean;
  weight: number;
  reps: number;
}

interface WorkoutExercisesSet {
  id: string;
  name: string;
}

interface ExerciseFormProps {
  workoutExercises: WorkoutExercisesSet[];
  start: boolean;
}

export default function ExerciseForm({
  workoutExercises,
  start,
}: ExerciseFormProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const updatedExercises = workoutExercises.map((workoutExercise) => {
      const existingExercise = exercises.find(
        (exercise) => exercise.id === workoutExercise.id
      );

      if (existingExercise) {
        return {
          ...existingExercise,
        };
      } else {
        return {
          id: workoutExercise.id,
          name: workoutExercise.name,
          sets: [],
        };
      }
    });
    setExercises(updatedExercises);
  }, [workoutExercises]);

  const handleAddSet = (index: number) => {
    const exercise = exercises[index];

    const updatedExercise = {
      ...exercise,
      sets: [
        ...exercise.sets,
        { id: Date.now(), completed: false, weight: 0, reps: 0 },
      ],
    };

    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;

    setExercises(updatedExercises);
  };

  const handleWeightChange = (
    exerciseIndex: number,
    setIndex: number,
    value: string
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex].weight = parseFloat(value);
    setExercises(updatedExercises);
  };

  const handleRepsChange = (
    exerciseIndex: number,
    setIndex: number,
    value: string
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex].reps = parseFloat(value);
    setExercises(updatedExercises);
  };

  const handleComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    const completed = updatedExercises[exerciseIndex].sets[setIndex].completed;
    updatedExercises[exerciseIndex].sets[setIndex].completed = !completed;
    setExercises(updatedExercises);
  };

  return (
    <>
      <WorkoutTopBar exercises={exercises} start={start} name={name} />
      <div>
        {!start && (
          <div className="mx-4 mb-4">
            <input
              className="bg-stone-900 text-stone-50 w-full border-b border-stone-500 py-4 text-xl placeholder:text-stone-500"
              type="text"
              placeholder="Workout title"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        )}
        {exercises.map((exercise, exerciseIndex) => {
          return (
            <div key={exerciseIndex}>
              <ExerciseItem name={exercise.name} />
              <div className="mt-1">
                <table className="w-full text-center text-stone-400 table-fixed">
                  <thead className="text-xs w-full">
                    <tr>
                      <th>SET</th>
                      <th>PREVIOUS</th>
                      <th>KG</th>
                      <th>REPS</th>
                      <th>
                        <span
                          className={twMerge(
                            !start ? 'hidden' : 'material-symbols-outlined'
                          )}
                        >
                          done
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercise.sets.map((set, setIndex) => {
                      return (
                        <tr
                          key={set.id}
                          className={twMerge(
                            setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900',
                            'h-12',
                            set.completed && 'bg-lime-900 text-stone-50'
                          )}
                        >
                          <td className="w-auto">
                            <p>{setIndex + 1}</p>
                          </td>
                          <td className="w-auto">24kg x 10</td>
                          <td className="w-auto">
                            <input
                              type="number"
                              className={twMerge(
                                'w-full text-center',
                                setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900',
                                set.completed && 'bg-lime-900'
                              )}
                              placeholder="--"
                              value={set.weight.toString()}
                              onChange={(e) =>
                                handleWeightChange(
                                  exerciseIndex,
                                  setIndex,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className={twMerge(
                                'w-full text-center',
                                setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900',
                                set.completed && 'bg-lime-900'
                              )}
                              placeholder="--"
                              value={set.reps.toString()}
                              onChange={(e) =>
                                handleRepsChange(
                                  exerciseIndex,
                                  setIndex,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="h-12 flex justify-center items-center">
                            <div
                              className={twMerge(
                                !start ? 'hidden' : 'relative w-6 flex'
                              )}
                            >
                              <input
                                type="checkbox"
                                className="appearance-none w-6 h-6 rounded-sm bg-stone-400 shrink-0 checked:bg-lime-300"
                                checked={set.completed}
                                onChange={() =>
                                  handleComplete(exerciseIndex, setIndex)
                                }
                              />
                              <span
                                className={
                                  'absolute material-symbols-outlined pointer-events-none ' +
                                  (set.completed
                                    ? 'text-lime-900'
                                    : 'text-stone-100')
                                }
                              >
                                done
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mx-4">
                <button
                  className="w-full flex items-center justify-center bg-stone-800 rounded-full h-10 font-bold mt-2"
                  onClick={() => handleAddSet(exerciseIndex)}
                >
                  <span className="material-symbols-outlined">add</span>Add set
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
