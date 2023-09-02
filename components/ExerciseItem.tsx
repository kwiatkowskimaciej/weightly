import Image from 'next/image';

interface Props {
  id?: string;
  name: string;
  image: string | null;
}

export default function ExerciseItem({ id, name, image }: Props) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Image
        className="rounded-full"
        src={'https://placehold.co/64.png'}
        alt={name}
        width={64}
        height={64}
      />
      <div className="text-blue-400 font-bold">
        {name.charAt(0).toUpperCase()}
        {name.slice(1)}
      </div>
    </div>
  );
}
