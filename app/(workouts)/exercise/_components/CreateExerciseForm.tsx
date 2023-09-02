'use client';

import { useState } from 'react';
import TypeSelection from './TypeSelection';
import CreateExerciseTopBar from './CreateExerciseTopBar';

interface Exercise {
  name: string;
  imgUrl: string;
  videoUrl: string;
  type: string;
}

export default function CreateExerciseForm() {
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    imgUrl: '',
    videoUrl: '',
    type: '',
  });

  const handleImageUrlChange = (url: string) => {
    const updatedExercise: Exercise = { ...exercise };
    updatedExercise.imgUrl = url;
    setExercise(updatedExercise);
  };

  const handleVideoUrlChange = (url: string) => {
    const updatedExercise: Exercise = { ...exercise };
    updatedExercise.videoUrl = url;
    setExercise(updatedExercise);
  };

  const handleNameChange = (name: string) => {
    const updatedExercise: Exercise = { ...exercise };
    updatedExercise.name = name;
    setExercise(updatedExercise);
  };

  return (
    <>
      <CreateExerciseTopBar exercise={exercise} />
      <div className="mx-4 flex flex-col mt-4">
        <input
          type="url"
          name="exercise-img"
          placeholder="Image url"
          className="h-14 px-4 bg-stone-900 placeholder:text-stone-400 border-b border-lime-900 text-stone-50"
          value={exercise.imgUrl}
          onChange={(e) => handleImageUrlChange(e.target.value)}
        />
        <input
          type="url"
          name="exercise-video"
          placeholder="Video url"
          className="mt-4 h-14 px-4 bg-stone-900 placeholder:text-stone-400 border-b border-lime-900 text-stone-50"
          value={exercise.videoUrl}
          onChange={(e) => handleVideoUrlChange(e.target.value)}
        />
        <input
          type="text"
          name="exercise-name"
          placeholder="Exercise name"
          className="mt-4 h-14 px-4 bg-stone-900 placeholder:text-stone-400 border-b border-lime-900 text-stone-50"
          value={exercise.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <TypeSelection exercise={exercise} setExercise={setExercise} />
      </div>
    </>
  );
}
