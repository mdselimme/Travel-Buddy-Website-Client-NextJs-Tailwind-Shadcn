"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IUserDashboardStats } from "@/types/user.stats.types";
import {
  Activity,
  Calendar,
  CheckCircle,
  CreditCard,
  Globe,
  MapPin,
  Plane,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";

interface UserDashboardDataProps {
  data: IUserDashboardStats;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function UserDashboardData({ data }: UserDashboardDataProps) {
  const {
    overview,
    travelPlansByStatus,
    budgetByMonth,
    travelFrequencyByMonth,
    socialMetrics,
    upcomingTrips,
    destinationsVisited,
  } = data;

  const overviewCards = [
    {
      title: "Total Plans",
      value: overview.totalTravelPlans,
      icon: Plane,
      description: "All time travel plans",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Upcoming",
      value: overview.upcomingTravelPlans,
      icon: Calendar,
      description: "Scheduled trips",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Completed",
      value: overview.completedTravelPlans,
      icon: CheckCircle,
      description: "Successfully completed",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "Countries Joined",
      value: overview.totalCountries,
      icon: Globe,
      description: "Different countries",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${card.bg}`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <span>{card.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Frequency Chart */}
        <Card className="col-span-1 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Travel Frequency</CardTitle>
            <CardDescription>Trips taken over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={travelFrequencyByMonth}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorTravel"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorTravel)"
                    name="Trips"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Analysis */}
        <Card className="col-span-1 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>Budget allocation per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetByMonth}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    name="Budget"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <Card className="col-span-1 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Plan Status</CardTitle>
            <CardDescription>Current status of all plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {travelPlansByStatus && travelPlansByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={travelPlansByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="status"
                    >
                      {travelPlansByStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <Plane className="w-10 h-10 mb-2 opacity-20" />
                  <p>No travel plans found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Metrics */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
            <CardDescription>
              Your interactions with other travelers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-2xl font-bold">
                  {socialMetrics.matchesAccepted}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  Matches Accepted
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <Activity className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-2xl font-bold">
                  {socialMetrics.acceptanceRate}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  Acceptance Rate
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <CreditCard className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-2xl font-bold">
                  {socialMetrics.totalReviews}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  Reviews Given
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <CardTitle className="w-8 h-8 text-amber-500 mb-2 flex items-center justify-center font-bold">
                  {socialMetrics.averageRating}
                </CardTitle>
                <span className="text-xs text-muted-foreground text-center">
                  Avg Rating
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">
                Top Destinations Visited
              </h4>
              <div className="space-y-3">
                {destinationsVisited.slice(0, 3).map((dest, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {dest.city}, {dest.country}
                      </span>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {dest.visitCount || 1} visits
                    </span>
                  </div>
                ))}
                {destinationsVisited.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No past trips recorded yet.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Adventures</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTrips.map((trip) => (
            <Card
              key={trip._id}
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-48 w-full">
                {trip.thumbnail ? (
                  <Image
                    src={trip.thumbnail}
                    alt={trip.destination?.city || "Travel"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {trip.travelPlanStatus}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold truncate pr-2">
                      {trip.travelTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {trip.destination?.city}, {trip.destination?.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {upcomingTrips.length === 0 && (
            <div className="col-span-full py-12 text-center bg-muted/20 rounded-lg">
              <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                No upcoming trips scheduled. Time to plan your next adventure!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
