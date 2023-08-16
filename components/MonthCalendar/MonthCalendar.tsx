import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { generateDate, months } from '@/lib/utils/calendar';
import { twMerge } from 'tailwind-merge';

interface MonthCalendarProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function MonthCalendar({ show, setShow }: MonthCalendarProps) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div
      className={twMerge(
        show ? '' : 'hidden',
        'max-w-[328px] absolute top-16 right-4 ml-4 bg-stone-800 rounded-xl text-base font-sans px-3 z-10'
      )}
    >
      <div className="flex justify-around items-center mt-5 mb-[30px] text-sm">
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer h-6"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="select-none w-10 text-center">
            {months[today.month()].substring(0, 3)}
          </span>
          <button
            className="cursor-pointer h-6"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer h-6"
            onClick={() => {
              setToday(today.year(today.year() - 1));
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="select-none w-10 text-center">{today.year()}</span>
          <button
            className="cursor-pointer h-6"
            onClick={() => {
              setToday(today.year(today.year() + 1));
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, index) => (
          <span
            key={index}
            className="text-base text-center grid place-content-center text-stone-100 select-none"
          >
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 mb-2">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => (
            <div
              key={index}
              className="p-2 text-center h-10 grid place-content-center text-base"
            >
              <span
                className={twMerge(
                  currentMonth ? '' : 'text-stone-500',
                  today ? 'border border-lime-300' : '',
                  selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                    ? 'bg-lime-300 text-stone-900'
                    : '',
                  'h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none'
                )}
                onClick={() => {
                  setSelectDate(date);
                }}
              >
                {date.date()}
              </span>
            </div>
          )
        )}
      </div>
      <div className="w-full flex justify-end mb-3 text-lime-300 font-medium">
        <button
          className="pr-4 cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          Close
        </button>
        <button
          className="pr-3 cursor-pointer"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
}
