import WorkoutTopBar from '@/app/(workouts)/_components/WorkoutTopBar';
import ExerciseItem from '@/components/ExerciseItem';
import { getWorkout } from '@/app/(workouts)/actions';
import { IWorkout } from '@/app/(workouts)/types';
import { twMerge } from 'tailwind-merge';

interface Props {
  params: {
    id: string;
  };
}

const emptyWorkout: IWorkout = {
  id: '',
  name: '',
  exercises: [],
  date: new Date(),
  save: false,
  userId: '',
  planId: null,
};

export default async function Preview({ params }: Props) {
  const workout = (await getWorkout(params.id)) || emptyWorkout;
  return (
    <div className="w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutTopBar workout={workout} start={false} preview={true} />
      {workout?.exercises.map((exercise, exerciseIndex) => {
        return (
          <div key={exerciseIndex}>
            <ExerciseItem name={exercise.name} />
            <table className="w-full text-stone-400 table-auto text-left">
              <thead className="text-xs w-full">
                <tr>
                  <th className='pl-4'>Set</th>
                  <th>Weight & Reps</th>
                </tr>
              </thead>
              <tbody>
                {exercise.sets.map((set, setIndex) => {
                  return (
                    <tr
                      key={setIndex}
                      className={twMerge(
                        setIndex % 2 ? 'bg-stone-800' : 'bg-stone-900',
                        'h-12'
                      )}
                    >
                      <td className="w-auto pl-4">{setIndex + 1}</td>
                      <td className="w-auto">
                        {set.weight}kg x {set.reps} reps
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
