'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

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
      <span className='material-icons-outlined'>logout</span>Sign out
    </button>
  );
}
