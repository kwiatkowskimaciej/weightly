import ExerciseItem from '@/components/ExerciseItem';

export default async function Exercises() {
  const url = 'https://exercisedb.p.rapidapi.com/exercises';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  const response = await fetch(url, options);
  const exercises = await response.json();

  return (
    <div>
      {exercises.map((exercise: any) => {
        return <ExerciseItem name={exercise.name} image={exercise.gifUrl} />;
      })}
    </div>
  );
}
