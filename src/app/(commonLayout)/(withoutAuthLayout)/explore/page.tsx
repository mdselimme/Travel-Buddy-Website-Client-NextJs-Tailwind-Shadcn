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

  const { search, startDate, travelType } = resolvedSearchParams;
  const { data: allTravelPlans } = await getAllTravelsPlans({
    search: Array.isArray(search) ? search[0] : search,
    startDate: Array.isArray(startDate) ? startDate[0] : startDate,
    travelType: Array.isArray(travelType) ? travelType[0] : travelType,
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
