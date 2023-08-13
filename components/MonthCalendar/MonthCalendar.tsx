import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './MonthCalendar.css';

interface MonthCalendarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MonthCalendar({ isOpen, setIsOpen }: MonthCalendarProps) {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      className="absolute top-16 mx-4"
    >
      <Calendar onChange={onChange} value={value} locale="en-GB"/>
    </Dialog>
  );
}
