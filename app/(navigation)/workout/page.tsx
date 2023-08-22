import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Workout() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      <div className="m-4 sm:ml-24 xl:ml-[376px] xl:max-w-xl">
        <h2 className="font-header text-stone-50 text-3xl">Quick start</h2>
        <Link href={'/quick/new'} key={'new'}>
          <button className="w-full flex items-center justify-center bg-lime-300 rounded-full h-10 font-bold">
            <span className="material-symbols-outlined">add</span>Start new
            workout
          </button>
        </Link>
        <h2 className="font-header text-stone-50 text-3xl mt-6">Workout</h2>
        <div className="h-12 border-b border-stone-700 flex items-center text-stone-50">
          <div className="w-1/2 h-full flex flex-col items-center justify-end">
            <div className="pb-[9px] text-lime-300">Plans</div>
            <div className="h-[3px] w-[30px] bg-lime-300 rounded-t-[3px]"></div>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-end">
            <div className="pb-[9px]">Individual</div>
            <div className="h-[3px] w-[30px] bg-stone-900 rounded-t-[3px]"></div>
          </div>
        </div>
        {/* <WorkoutCard /> */}
      </div>
    </>
  );
}
