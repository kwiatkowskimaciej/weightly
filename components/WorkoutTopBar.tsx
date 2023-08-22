import { addWorkout } from '@/app/workout/new/actions';
import Link from 'next/link';

export default function WorkoutTopBar({exercises}: any) {
  return (
    <div className="w-full h-16 px-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-blue-400">
      <div className="flex items-center gap-4">
        <Link
          href={'/workout'}
          key={'workout'}
          className="material-icons-outlined"
        >
          arrow_back
        </Link>
        <span className="font-header text-2xl mt-1">New workout</span>
      </div>
      <button
        className="flex items-center bg-lime-300 px-6 rounded-full h-10 font-bold text-stone-900"
        onClick={() => {
          addWorkout(exercises);
        }}
      >
        Finish
      </button>
    </div>
  );
}
