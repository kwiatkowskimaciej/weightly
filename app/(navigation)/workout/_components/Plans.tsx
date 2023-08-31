import PlanCard from './PlanCard';

interface Plan {
  id: string;
  name: string;
  start: Date;
  duration: number;
  userId: string;
  _count: {
    workouts: number;
  };
}

interface Props {
  plans: Plan[];
}

export default function Plans({ plans }: Props) {
  return (
    <div className="mx-4">
      {plans.map((plan, index) => {
        return <PlanCard key={index} {...plan} />;
      })}
    </div>
  );
}
