import PaginationBox from "@/components/Shared/PagintationBox";
import TravelCard from "./TravelCard";
import { ITravelPlan } from "@/types/travel.plan.types";
import { IPaginationProps } from "@/types/pagination.types";

interface TravelPlansGridProps {
  plans: ITravelPlan[];
  pagination: IPaginationProps;
}

const TravelPlansGrid = ({ plans, pagination }: TravelPlansGridProps) => {
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: ITravelPlan) => (
          <TravelCard key={plan._id} plan={plan} />
        ))}
      </div>
      <PaginationBox
        totalPages={pagination.pages}
        currentPage={pagination.page}
      />
    </div>
  );
};

export default TravelPlansGrid;
