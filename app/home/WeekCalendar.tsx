function calculateWeekDates(fromDate: Date): Date[] {
  const startDate = new Date(fromDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);
    return currentDate;
  });
}

export function WeekCalendar() {
  const fromDate = new Date();
  const weekDates = calculateWeekDates(fromDate);

  return (
    <div className="w-full bg-stone-900 text-stone-50 px-4 sm:pl-24 xl:pl-[376px]">
      <ul className="flex justify-between xl:gap-2 xl:justify-start">
        {weekDates.map((date, index) => (
          <li key={index} className={"border border-stone-800 rounded-full py-3 flex flex-col items-center gap-4 w-10 xl:flex-row xl:w-auto xl:px-4 xl:justify-center " + (fromDate.toDateString() === date.toDateString() ? "bg-lime-300 text-stone-900 rounded-full" : null)}>
            <span>
              {date.toLocaleDateString(undefined, { weekday: 'short' })}
            </span>
            <span>{date.toLocaleDateString(undefined, { day: 'numeric' })}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
