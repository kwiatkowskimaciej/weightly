import { SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const types = [
  { name: 'Weight & Reps', chips: ['reps', 'kg'] },
  { name: 'Bodyweight Reps', chips: ['reps'] },
  { name: 'Weighted Bodyweight', chips: ['reps', '+kg'] },
  { name: 'Assisted Bodyweight', chips: ['reps', '-kg'] },
  { name: 'Duration', chips: ['time'] },
  { name: 'Distance & Duration', chips: ['time', 'km'] },
  { name: 'Weight & Distance', chips: ['kg', 'km'] },
];

interface Exercise {
  name: string;
  imgUrl: string;
  videoUrl: string;
  type: string;
}

interface Props {
  exercise: Exercise;
  setExercise: React.Dispatch<SetStateAction<Exercise>>;
}

export default function TypeSelection({ exercise, setExercise }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="mt-4 h-14 px-4 bg-stone-900 border-b border-lime-900 flex items-center justify-between"
        onClick={() => setIsOpen(true)}
      >
        <div>
          <div className="text-stone-50">Exercise type</div>
          <div className="text-blue-400">
            {(!exercise.type && 'Select') || exercise.type}
          </div>
        </div>
        <div className="h-full flex items-center text-stone-200">
          <span className="material-icons-outlined">chevron_right</span>
        </div>
      </div>

      <div
        className={twMerge(
          'absolute top-0 left-0 w-full h-full bg-stone-900',
          !isOpen && 'hidden'
        )}
      >
        <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
          <div className="flex items-center gap-4">
            <button
              className="material-icons-outlined"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              close
            </button>
            <span className="font-header text-2xl mt-1">
              Select exercise type
            </span>
          </div>
        </div>
        <div className="mx-4">
          {types.map((type, typeIndex) => {
            return (
              <div
                key={typeIndex}
                className="flex flex-col gap-2 mt-4 pb-4 border-b border-stone-700"
                onClick={() => {
                  const updatedExercise = { ...exercise };
                  updatedExercise.type = type.name;
                  setExercise(updatedExercise);
                  setIsOpen(false);
                }}
              >
                <div className="text-stone-50">{type.name}</div>
                <div className="flex gap-2">
                  {type.chips.map((chip, chipIndex) => {
                    return (
                      <div
                        key={chipIndex}
                        className="px-4 h-8 bg-stone-700 text-stone-50 rounded-md flex items-center uppercase text-xs"
                      >
                        {chip}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
