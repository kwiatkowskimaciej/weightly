'use client';

import React, { useState } from 'react';

interface ExerciseSet {
  id: number;
  completed: boolean;
  kg: number;
  reps: number;
}

export default function ExerciseForm() {
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);
  const [newSetId, setNewSetId] = useState(1);

  const handleNewSetClick = () => {
    setExerciseSets([
      ...exerciseSets,
      { id: newSetId, completed: false, kg: 0, reps: 0 },
    ]);
    setNewSetId(newSetId + 1);
  };

  const handleCheckboxChange = (setId: number) => {
    setExerciseSets((prevSets) =>
      prevSets.map((set) =>
        set.id === setId ? { ...set, completed: !set.completed } : set
      )
    );
  };

  const handleKgChange = (setId: number, kg: number) => {
    setExerciseSets((prevSets) =>
      prevSets.map((set) => (set.id === setId ? { ...set, kg } : set))
    );
  };

  const handleRepsChange = (setId: number, reps: number) => {
    setExerciseSets((prevSets) =>
      prevSets.map((set) => (set.id === setId ? { ...set, reps } : set))
    );
  };

  return (
    <div>
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4 text-sm text-stone-300 content-center mb-1 items-center justify-items-center">
          <span>SET</span>
          <span>KG</span>
          <span>REPS</span>
          <span className="material-symbols-outlined">done</span>
        </div>
        {exerciseSets.map((set) => (
          <div
            key={set.id}
            className={
              'grid grid-cols-4 gap-4 items-center justify-items-center py-2 ' +
              (set.id % 2 ? 'bg-stone-800' : null)
            }
          >
            <div className="w-6 text-center">
              <p>{set.id}</p>
            </div>
            <input
              type="number"
              className={
                'w-full text-center p-1 rounded-xl ' +
                (set.id % 2 ? 'bg-stone-800' : 'bg-stone-900')
              }
              placeholder="--"
              onChange={(e) => handleKgChange(set.id, Number(e.target.value))}
            />
            <input
              type="number"
              className={
                'w-full text-center p-1 rounded-xl ' +
                (set.id % 2 ? 'bg-stone-800' : 'bg-stone-900')
              }
              placeholder="--"
              onChange={(e) => handleRepsChange(set.id, Number(e.target.value))}
            />
            <div className="relative">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-sm bg-stone-400 shrink-0 checked:bg-lime-300 mt-1"
                checked={set.completed}
                onChange={() => handleCheckboxChange(set.id)}
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
        ))}
      </div>
      <button
        className="w-full flex items-center justify-center bg-stone-800 rounded-full h-10 font-bold mt-2"
        onClick={handleNewSetClick}
      >
        <span className="material-symbols-outlined">add</span>Add set
      </button>
    </div>
  );
}
