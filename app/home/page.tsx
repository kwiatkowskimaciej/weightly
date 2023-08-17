import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { WeekCalendar } from './WeekCalendar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <>
      <WeekCalendar />
      <div className="m-4 sm:ml-24 xl:ml-[376px] xl:max-w-xl">
        <h2 className="font-header text-stone-50 text-3xl">Next workout</h2>
        <WorkoutCard />
      </div>
    </>
  );
}
