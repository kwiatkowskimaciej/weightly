interface Props {
  id?: string;
  name: string | null;
}

export default function ExerciseItem({id, name}: Props) {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div className="w-10 h-10 rounded-full bg-stone-500"></div>
      <div className="text-blue-400 font-bold">{name}</div>
    </div>
  )
}