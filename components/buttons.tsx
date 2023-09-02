'use client';

import { deleteWorkout } from '@/app/(navigation)/actions';
import { addWorkout, updateWorkout } from '@/app/(workouts)/actions';
import { IWorkout } from '@/app/(workouts)/types';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return <>Logged In</>;
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return (
    <button
      className="flex items-center bg-lime-300 pl-4 pr-6 rounded-full h-10 font-bold"
      onClick={() => signOut()}
    >
      <span className="material-icons-outlined">logout</span>Sign out
    </button>
  );
}

export function Back() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="material-icons-outlined">
      arrow_back
    </button>
  );
}

interface WorkoutBackProps {
  workout: IWorkout;
}

export function WorkoutBack({ workout }: WorkoutBackProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        updateWorkout({ data: workout });
        router.back();
      }}
      className="material-icons-outlined"
    >
      arrow_back
    </button>
  );
}

interface discardId {
  workoutId: string;
}

export function Discard({ workoutId }: discardId) {
  const router = useRouter();
  return (
    <button
      className="pl-4 pr-6 flex items-center justify-center bg-stone-800 rounded-full border border-red-400 h-10 font-bold text-red-400"
      onClick={() => {
        deleteWorkout({ id: workoutId });
        router.refresh();
      }}
    >
      <span className="material-symbols-outlined">close</span>Discard
    </button>
  );
}
