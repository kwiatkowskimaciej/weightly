import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';

export default async function Workout() {
  return (
    <>
      <div className="m-4">
        <h2 className="font-header text-stone-50 text-3xl">Quick start</h2>
        <button className="w-full flex items-center justify-center bg-lime-300 rounded-full h-10 font-bold">
          <span className="material-symbols-outlined">add</span>Start new
          workout
        </button>
        <h2 className="font-header text-stone-50 text-3xl mt-6">Workout</h2>
        <div className="h-12 border-b border-stone-700 flex items-center text-stone-50">
          <div className="w-1/2 h-full flex flex-col items-center justify-end">
            <div className="pb-[9px] text-lime-300">Plans</div>
            <div className="h-[3px] w-[30px] bg-lime-300 rounded-t-[3px]"></div>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-end">
            <div className='pb-[9px]'>Individual</div>
            <div className="h-[3px] w-[30px] bg-stone-900 rounded-t-[3px]"></div>
          </div>
        </div>
        <WorkoutCard />
      </div>
    </>
  );
}
