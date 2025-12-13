import TravelCard from "./TravelCard";
import { ITravelPlan } from "@/types/travel.plan.types";

interface TravelPlansGridProps {
  plans: ITravelPlan[];
}

const TravelPlansGrid = ({ plans }: TravelPlansGridProps) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No travel plans found. Try adjusting your filters!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan: ITravelPlan) => (
        <TravelCard key={plan._id} plan={plan} />
      ))}
    </div>
  );
};

export default TravelPlansGrid;
