'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import ExerciseItem from '@/components/ExerciseItem';
import { IWorkout } from '../types';

interface Props {
  workout: IWorkout;
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout>>;
  start: boolean;
}

export default function ExerciseForm({ workout, setWorkout, start }: Props) {
  const handleAddSet = (index: number) => {
    const updatedWorkout: IWorkout = { ...workout };

    updatedWorkout.exercises[index].sets.push({
      id: String(new Date()),
      completed: false,
      weight: 0,
      reps: 0,
      exerciseId: updatedWorkout.exercises[index].id,
      workoutId: updatedWorkout.id,
    });

    setWorkout(updatedWorkout);
  };

  const handleWeightChange = (
    exerciseIndex: number,
    setIndex: number,
    value: string
  ) => {
    const updatedWorkout: IWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].weight =
      parseFloat(value);

    setWorkout(updatedWorkout);
  };

  const handleRepsChange = (
    exerciseIndex: number,
    setIndex: number,
    value: string
  ) => {
    const updatedWorkout: IWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].reps =
      parseFloat(value);

    setWorkout(updatedWorkout);
  };

  const handleComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout: IWorkout = { ...workout };
    const completed =
      updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed;
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed =
      !completed;

    setWorkout(updatedWorkout);
  };

  const handleNameChange = (name: string) => {
    const updatedWorkout: IWorkout = { ...workout };

    updatedWorkout.name = name;

    setWorkout(updatedWorkout);
  };

  const deleteExercise = (exerciseIndex: number) => {
    const updatedWorkout: IWorkout = { ...workout };

    updatedWorkout.exercises.splice(exerciseIndex, 1);

    setWorkout(updatedWorkout);
  };

  const deleteSet = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout: IWorkout = { ...workout };

    updatedWorkout.exercises[exerciseIndex].sets.splice(setIndex, 1);

    setWorkout(updatedWorkout);
  };

  return (
    <>
      <div>
        {!start && (
          <div className="mx-4 mb-4">
            <input
              className="bg-stone-900 text-stone-50 w-full border-b border-stone-500 py-4 text-xl placeholder:text-stone-500"
              type="text"
              placeholder="Workout title"
              onChange={(e) => {
                handleNameChange(e.target.value);
              }}
            />
          </div>
        )}
        {workout.exercises.map((exercise, exerciseIndex) => {
          return (
            <div key={exerciseIndex}>
              <div className="flex items-center justify-between pr-4 mt-2">
                <ExerciseItem name={exercise.name} />
                {start && (
                  <button
                    className="py-2 material-symbols-outlined bg-red-400 text-stone-900 p-2 rounded-full"
                    onClick={() => deleteExercise(exerciseIndex)}
                  >
                    delete
                  </button>
                )}
              </div>
              <div className="mt-1">
                <table className="w-full text-center text-stone-400 table-fixed">
                  <thead className="text-xs w-full">
                    <tr>
                      <th className="w-6"></th>
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
                          key={setIndex}
                          className={twMerge(
                            setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900',
                            'h-12',
                            set.completed && 'bg-lime-900 text-stone-50'
                          )}
                        >
                          {start && (
                            <td className="w-auto flex items-center text-center pl-4">
                              <button
                                className="material-symbols-outlined rounded-full"
                                onClick={() =>
                                  deleteSet(exerciseIndex, setIndex)
                                }
                              >
                                close
                              </button>
                            </td>
                          )}
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
              <div className="mx-4 text-stone-50">
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
