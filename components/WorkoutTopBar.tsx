import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function WorkoutTopBar() {
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
        type="submit"
        className="flex items-center bg-lime-300 px-6 rounded-full h-10 font-bold text-stone-900"
      >
        Finish
      </button>
    </div>
  );
}
