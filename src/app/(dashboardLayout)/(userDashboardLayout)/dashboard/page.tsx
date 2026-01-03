import { getStats } from "@/actions/stats/getStats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `User Dashboard Home || Travel Buddy`,
  description:
    "Travel Buddy User Dashboard Home Page to view your travel plan statistics.",
};

const CommonDashboardPage = async () => {
  const { data: stats } = await getStats();

  const statCards = [
    {
      title: "Total Travel Plans",
      value: stats?.totalTravelPlans || 0,
      icon: "📋",
      color: "bg-blue-500",
    },
    {
      title: "Upcoming Plans",
      value: stats?.upcomingTravelPlans || 0,
      icon: "🗺️",
      color: "bg-green-500",
    },
    {
      title: "Completed Plans",
      value: stats?.completedTravelPlans || 0,
      icon: "✅",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Heres an overview of your travel plans
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <p className="text-4xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} rounded-full p-4 text-2xl`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonDashboardPage;
