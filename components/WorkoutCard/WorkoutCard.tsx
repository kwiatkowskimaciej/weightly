import Link from 'next/link';

interface Props {
  id: string;
  date: Date;
  exerciseCount: number;
}

export default function WorkoutCard({ id, date, exerciseCount }: Props) {
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
    <Link href={`/workout-log/preview/${id}`}>
      <div className="bg-stone-800 bg-workout-card-pattern bg-cover rounded-xl w-full p-4 mt-2 relative border-2 border-stone-800 bg-blend-luminosity">
        <span className="border-2 border-blue-400 rounded-lg inline-block px-4  text-stone-50 py-1">
          {exerciseCount} exercises
        </span>
        <div className="font-header text-stone-50 text-2xl mt-4">{id}</div>
        <div className="flex flex-col mt-4 gap-2 text-stone-200">
          <div className="flex items-center justify-start gap-2">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>
              {daysOfWeek[date.getDay()]}, {date.getDate()}{' '}
              {months[date.getMonth()]}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span className="material-symbols-outlined">timer</span>
            <span>96 minutes</span>
          </div>
        </div>
        <button className="absolute right-4 bottom-4 flex items-center bg-lime-300 pl-4 pr-6 rounded-full h-10 font-bold">
          <span className="material-symbols-outlined">play_arrow</span>Start
        </button>
      </div>
    </Link>
  );
}
