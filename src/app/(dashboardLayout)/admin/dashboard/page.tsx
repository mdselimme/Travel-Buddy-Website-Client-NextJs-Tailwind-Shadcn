import { getStats } from "@/actions/stats/getStats";
import AdminStatsDisplay from "@/components/modules/Dashboard/AdminStatsDisplay";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `Admin Dashboard Home || Travel Buddy`,
  description:
    "Travel Buddy Admin Dashboard Home Page to view platform statistics.",
};

const AdminDashboardPage = async () => {
  const stats = await getStats();

  if (!stats || !stats.data) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Failed to Load Stats
          </h2>
          <p className="text-red-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <AdminStatsDisplay data={stats.data} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
