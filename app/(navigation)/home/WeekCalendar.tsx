import { prisma } from '@/lib/prisma';

function calculateWeekDates(fromDate: Date): Date[] {
  const startDate = new Date(fromDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);
    return currentDate;
  });
}

export async function WeekCalendar() {
  const fromDate = new Date();
  const weekDates = calculateWeekDates(fromDate);
  const workoutDates = await prisma.workout.findMany({
    select: {
      date: true,
    },
  });

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dates = workoutDates.map((workout) =>
    workout.date.toLocaleString(undefined, options as Intl.DateTimeFormatOptions)
  );

  return (
    <div className="w-full bg-stone-900 text-stone-50 px-4 sm:pl-24 xl:pl-[376px]">
      <ul className="flex justify-between xl:gap-2 xl:justify-start">
        {weekDates.map((date, index) => (
          <li
            key={index}
            className={
              'relative border border-stone-800 rounded-full py-3 flex flex-col items-center gap-4 w-10 xl:flex-row xl:w-auto xl:px-4 xl:justify-center ' +
              (fromDate.toDateString() === date.toDateString()
                ? 'bg-lime-300 text-stone-900 rounded-full'
                : null)
            }
          >
            <span>
              {date
                .toLocaleDateString(undefined, { weekday: 'short' })
                .charAt(0)}
            </span>
            {dates.includes(date.toLocaleString(undefined, options as Intl.DateTimeFormatOptions)) && (
              <span
                className={
                  'absolute top-[43px] rounded-full w-1 h-1 ' +
                  (fromDate.toDateString() === date.toDateString()
                    ? 'bg-stone-900'
                    : 'bg-stone-50')
                }
              ></span>
            )}
            <span>
              {date.toLocaleDateString(undefined, { day: 'numeric' })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
