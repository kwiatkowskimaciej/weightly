import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { WeekCalendar } from './WeekCalendar';

export default async function Home() {
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
