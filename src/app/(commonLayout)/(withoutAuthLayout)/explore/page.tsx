import { getAllTravelsPlans } from "@/actions/TravelPlan/getAllTravelPlans";
import { getAllTravelType } from "@/actions/travelType/getAllTravelType";
import {
  ExploreHero,
  ExploreFilter,
  TravelPlansGrid,
} from "@/components/modules/Explore";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;
  // destination=Mymensingh&startDate=2025-12-11&travelType=Adventure%20Travel&page=1&limit=10?
  console.log({ resolvedSearchParams });
  const { destination, startDate, travelType } = resolvedSearchParams;
  console.log(destination, startDate, travelType);
  const { data: allTravelPlans } = await getAllTravelsPlans({
    destination,
    startDate,
    travelType,
  });
  const { data: travelTypes } = await getAllTravelType();

  return (
    <div className="min-h-screen bg-gray-50">
      <ExploreHero />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ExploreFilter travelTypes={travelTypes} />
        <TravelPlansGrid plans={allTravelPlans} />
      </div>
    </div>
  );
};

export default ExplorePage;
