import { getAllTravelPlans } from "@/actions/TravelPlan/getAllTravelPlans";
import ManageTravelPlansTable from "@/components/modules/TravelPlan/ManageTravelPlansTable";
import { IPaginationProps } from "@/types/pagination.types";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard Manage Plans || Travel Buddy`,
  description: "Travel Buddy Manage Plans Page to manage travel plans.",
};

const ManagePlanPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { limit, page } = await searchParams;
  const { data: allTravelPlans, pagination } = await getAllTravelPlans({
    limit: Number(limit),
    page: Number(page),
  });

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all travel plans submitted by users.
        </p>
      </div>

      {/* Travel Plans Table */}
      <div className="mt-10">
        <ManageTravelPlansTable
          travelPlans={allTravelPlans}
          pagination={pagination as IPaginationProps}
        />
      </div>
    </div>
  );
};

export default ManagePlanPage;
