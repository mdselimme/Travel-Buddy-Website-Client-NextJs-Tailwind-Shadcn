"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, Users, DollarSign, Activity, Plane } from "lucide-react";
import { IAdminStats } from "@/types/stats.types";
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

interface AdminStatsDisplayProps {
  data: IAdminStats;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AdminStatsDisplay({ data }: AdminStatsDisplayProps) {
  const {
    overview,
    userGrowth,
    travelPlansByStatus,
    revenueGrowth,
    topDestinations,
    mostActiveUsers,
  } = data;

  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${overview.totalRevenue}`,
      icon: DollarSign,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      trend: `${overview.pendingPaymentCount} pending payments`,
    },
    {
      title: "Total Users",
      value: overview.totalUsers,
      icon: Users,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      trend: `${overview.totalRegularUsers} regular, ${overview.totalSubscribedUsers} premium`,
    },
    {
      title: "Active Travel Plans",
      value: overview.totalTravelPlans,
      icon: MapPin,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      trend: `${overview.totalMatches} matches found`,
    },
    {
      title: "Engagement",
      value: overview.totalReviews,
      icon: Activity,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      trend: "Total platform reviews",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your platform
          today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.bgColor} border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              New user registrations over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userGrowth}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    name="Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Revenue</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueGrowth}
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
                    name="Revenue"
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
        {/* Travel Plan Status Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Plan Status</CardTitle>
            <CardDescription>Distribution of travel plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
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
            </div>
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Destinations</CardTitle>
            <CardDescription>Most popular travel locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 min-w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {dest.city}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dest.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg">{dest.count}</span>
                    <span className="text-xs text-muted-foreground">
                      visits
                    </span>
                  </div>
                </div>
              ))}
              {topDestinations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No destination data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Active Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Most Active Users</CardTitle>
          <CardDescription>
            Users with high engagement and travel plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostActiveUsers.slice(0, 5).map((user) => (
              <div
                key={user.userId}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-semibold">
                        {user.fullName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.userId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold flex items-center justify-end gap-1">
                    <Plane className="w-3 h-3 text-primary" />
                    {user.travelPlanCount}
                  </div>
                  <p className="text-xs text-muted-foreground">Travel Plans</p>
                </div>
              </div>
            ))}
            {mostActiveUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No active user data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
