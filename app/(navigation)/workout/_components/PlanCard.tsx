import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  start: Date;
  duration: number;
  userId: string;
  _count: {
    workouts: number;
  };
}

export default function WorkoutCard({
  id,
  name,
  start,
  duration,
  userId,
  _count,
}: Plan) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className="relative">
      <Link href={`/plan/${id}`}>
        <div className="bg-stone-800 bg-workout-card-pattern bg-cover rounded-xl w-full p-4 mt-2 relative border-2 border-stone-800 bg-blend-luminosity">
          <span className="border-2 border-blue-400 rounded-lg inline-block px-4  text-stone-50 py-1">
            {start.getFullYear()}
          </span>
          <div className="font-header text-stone-50 text-2xl mt-4">{name}</div>
          <div className="flex flex-col mt-4 gap-2 text-stone-200">
            <div className="flex items-center justify-start gap-2">
              <span className="material-symbols-outlined">fitness_center</span>
              <span>{_count.workouts} workouts</span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="material-symbols-outlined">date_range</span>
              <span>{duration} weeks</span>
            </div>
          </div>
        </div>
      </Link>
      {/* <div className="absolute right-4 bottom-4">
        <Link
          href={`/workout-log/start/${id}`}
          className="flex items-center bg-lime-300 pl-4 pr-6 rounded-full h-10 font-bold"
        >
          <span className="material-symbols-outlined">play_arrow</span>Start
        </Link>
      </div> */}
    </div>
  );
}
