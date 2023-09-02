import { Back } from '@/components/buttons';
import { twMerge } from 'tailwind-merge';
import { createExercise } from '../actions';
import { useRouter } from 'next/navigation';

interface Exercise {
  name: string;
  imgUrl: string;
  videoUrl: string;
  type: string;
}

interface Props {
  exercise: Exercise;
}

export default function CreateExerciseTopBar({ exercise }: Props) {
  const router = useRouter();
  return (
    <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
      <div className="flex items-center gap-4">
        <Back />
        <span className="font-header text-2xl mt-1">Create exercise</span>
      </div>
      <button
        className={twMerge(
          'flex items-center bg-stone-800 px-6 rounded-full h-10 font-bold text-stone-900',
          exercise.name && exercise.type && 'bg-lime-300'
        )}
        disabled={!(exercise.name && exercise.type)}
        onClick={() => {
          createExercise({ exerciseData: exercise });
          router.back()
        }}
      >
        Create
      </button>
    </div>
  );
}
