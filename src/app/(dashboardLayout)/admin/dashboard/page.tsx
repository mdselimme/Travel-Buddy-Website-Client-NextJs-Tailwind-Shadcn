import { getStats } from "@/actions/stats/getStats";
import React from "react";
import AdminStatsDisplay from "@/components/modules/Dashboard/AdminStatsDisplay";

const DashboardPage = async () => {
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
        <AdminStatsDisplay
          totalTravelPlans={stats.data.totalTravelPlans}
          totalUsers={stats.data.totalUsers}
          totalAdmins={stats.data.totalAdmins}
          totalRegularUsers={stats.data.totalRegularUsers}
          totalSubscribedUsers={stats.data.totalSubscribedUsers}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
