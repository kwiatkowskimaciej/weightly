import WorkoutTopBar from '@/app/(workouts)/_components/WorkoutTopBar';
import { prisma } from '@/lib/prisma';
import WorkoutTable from './WorkoutTable';
import ExerciseItem from '@/components/ExerciseItem';

interface Props {
  params: {
    id: string;
  };
}

async function getWorkout(workoutId: string) {
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  return workout;
}

export default async function Preview({ params }: Props) {
  const workoutData = await getWorkout(params.id);
  return (
    <div className="w-full h-full z-20 bg-stone-900 text-stone-50">
      <WorkoutTopBar preview={true} />
      {workoutData?.exercises.map((exercise, exerciseIndex) => {
        return (
          <div key={exerciseIndex}>
            <ExerciseItem name={exercise.name} />
                <table>
                  <thead>
                    <tr>
                      <th>Set</th>
                      <th>Weight & Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                  {exercise.sets.map((set, setIndex) => {
                    return(
                      <tr key={setIndex}>
                        <td>{setIndex}</td>
                        <td>{set.weight}kg x {set.reps} reps</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
          </div>
        );
      })}
    </div>
  );
}
