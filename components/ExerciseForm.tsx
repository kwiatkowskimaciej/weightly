'use client';

import { addWorkout } from '@/app/workout/new/actions';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';

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
}

export default function ExerciseForm({ workoutExercises }: ExerciseFormProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <div>
        {exercises.map((exercise, exerciseIndex) => {
          return (
            <>
              <div className="px-4">
                <div className="border-b border-stone-800 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-500"></div>
                    <div className="text-stone-50">{exercise.name}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-4 gap-4 text-sm text-stone-300 content-center mb-1 items-center justify-items-center">
                  <span>SET</span>
                  <span>KG</span>
                  <span>REPS</span>
                  <span className="material-symbols-outlined">done</span>
                </div>
                {exercise.sets.map((set, setIndex) => {
                  return (
                    <div
                      key={set.id}
                      className={
                        'grid grid-cols-4 gap-4 items-center justify-items-center py-2 ' +
                        (setIndex % 2 ? 'bg-stone-800' : null)
                      }
                    >
                      <div className="w-6 text-center">
                        <p>{setIndex + 1}</p>
                      </div>
                      <input
                        type="number"
                        className={
                          'w-full text-center p-1 rounded-xl ' +
                          (setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900')
                        }
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
                      <input
                        type="number"
                        className={
                          'w-full text-center p-1 rounded-xl ' +
                          (setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900')
                        }
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
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="appearance-none w-6 h-6 rounded-sm bg-stone-400 shrink-0 checked:bg-lime-300 mt-1"
                          checked={set.completed}
                          onChange={() =>
                            handleComplete(exerciseIndex, setIndex)
                          }
                        />
                        <span
                          className={
                            'absolute top-1 left-0 material-symbols-outlined pointer-events-none ' +
                            (set.completed ? 'text-lime-900' : 'text-stone-100')
                          }
                        >
                          done
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mx-4">
                <button
                  className="w-full flex items-center justify-center bg-stone-800 rounded-full h-10 font-bold mt-2"
                  onClick={() => handleAddSet(exerciseIndex)}
                >
                  <span className="material-symbols-outlined">add</span>Add set
                </button>
              </div>
            </>
          );
        })}
      </div>
      <button
        onClick={() => {
          addWorkout(exercises);
        }}
      >
        submit
      </button>
    </>
  );
}
