import ExerciseItem from '@/components/ExerciseItem';
import { prisma } from '@/lib/prisma';

export default async function Exercises() {
  const exercises = await prisma.exercise.findMany();

  return (
    <div>
      {exercises.map((exercise) => {
        return (
          <ExerciseItem {...exercise} />
        );
      })}
    </div>
  );
}
