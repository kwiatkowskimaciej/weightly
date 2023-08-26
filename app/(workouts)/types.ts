export interface IWorkout {
  id: string;
  name: string;
  exercises: IWorkoutExercise[];
  date: Date;
  save: boolean;
  userId: string;
  planId: string | null;
}

export interface IWorkoutExercise {
  id: string;
  name: string;
  sets: ISet[];
}

export interface ISet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  exerciseId: string;
  workoutId: string;
}
