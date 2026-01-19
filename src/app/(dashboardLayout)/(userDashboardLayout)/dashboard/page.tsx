import { getStats } from "@/actions/stats/getStats";
import UserDashboardData from "@/components/modules/Dashboard/UserDashboardData";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `User Dashboard Home || Travel Buddy`,
  description:
    "Travel Buddy User Dashboard Home Page to view your travel plan statistics.",
};

const CommonDashboardPage = async () => {
  const { data: stats } = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your travel plans
          </p>
        </div>

        <UserDashboardData data={stats} />
      </div>
    </div>
  );
};

export default CommonDashboardPage;
