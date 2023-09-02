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
  image: string | null;
  sets: ISet[];
}

export interface ISet {
  id: string;
  date: Date;
  reps: number | null;
  weight: number | null;
  addWeight: number | null;
  subtractWeight: number | null;
  time: Date | null;
  distance: number | null;
  completed: boolean;
  exerciseId: string;
  workoutId: string;
}

export interface IExercise {
  id: string;
  name: string;
  video: string | null;
  type: string;
  sets: ISet[];
  workouts: IWorkout[];
}
