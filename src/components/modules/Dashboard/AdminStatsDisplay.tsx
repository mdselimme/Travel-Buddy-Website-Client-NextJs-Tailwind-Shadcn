"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Users,
  UserCheck,
  UserCog,
  CreditCard,
  TrendingUp,
} from "lucide-react";

interface AdminStatsDisplayProps {
  totalTravelPlans: number;
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
  totalSubscribedUsers: number;
}

export default function AdminStatsDisplay({
  totalTravelPlans,
  totalUsers,
  totalAdmins,
  totalRegularUsers,
  totalSubscribedUsers,
}: AdminStatsDisplayProps) {
  const stats = [
    {
      title: "Total Travel Plans",
      value: totalTravelPlans,
      icon: MapPin,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      trend: `${totalTravelPlans} plans created`,
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      trend: `${totalUsers} registered users`,
    },
    {
      title: "Admin Users",
      value: totalAdmins,
      icon: UserCog,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      trend: `${totalAdmins} administrators`,
    },
    {
      title: "Regular Users",
      value: totalRegularUsers,
      icon: UserCheck,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      trend: `${totalRegularUsers} regular members`,
    },
    {
      title: "Subscribed Users",
      value: totalSubscribedUsers,
      icon: CreditCard,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      trend: `${totalSubscribedUsers} premium members`,
    },
  ];

  const subscriptionRate =
    totalUsers > 0
      ? ((totalSubscribedUsers / totalUsers) * 100).toFixed(1)
      : "0";

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform statistics and metrics
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.bgColor} border ${stat.borderColor} hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Breakdown */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              User Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Regular Users</span>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-green-600">
                  {totalRegularUsers}
                </div>
                <span className="text-sm text-muted-foreground">
                  (
                  {totalUsers > 0
                    ? ((totalRegularUsers / totalUsers) * 100).toFixed(1)
                    : "0"}
                  %)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${
                    totalUsers > 0
                      ? (totalRegularUsers / totalUsers) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-muted-foreground">Admin Users</span>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-red-600">
                  {totalAdmins}
                </div>
                <span className="text-sm text-muted-foreground">
                  (
                  {totalUsers > 0
                    ? ((totalAdmins / totalUsers) * 100).toFixed(1)
                    : "0"}
                  %)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{
                  width: `${
                    totalUsers > 0 ? (totalAdmins / totalUsers) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Analytics */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              Subscription Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subscription Rate</span>
              <div className="text-3xl font-bold text-amber-600">
                {subscriptionRate}%
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500"
                style={{
                  width: `${
                    totalUsers > 0
                      ? (totalSubscribedUsers / totalUsers) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="text-sm text-muted-foreground mb-1">
                  Premium Members
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  {totalSubscribedUsers}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-sm text-muted-foreground mb-1">
                  Free Members
                </p>
                <p className="text-2xl font-bold text-slate-600">
                  {totalUsers - totalSubscribedUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="mt-6 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Platform Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground mb-2">
                Average Plans per User
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {totalUsers > 0 ? (totalTravelPlans / totalUsers).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-muted-foreground mb-2">
                Admin to User Ratio
              </p>
              <p className="text-3xl font-bold text-purple-600">
                1:{totalUsers > 0 ? (totalUsers / totalAdmins).toFixed(0) : 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground mb-2">
                Free to Premium Ratio
              </p>
              <p className="text-3xl font-bold text-green-600">
                1:{totalSubscribedUsers > 0 ? ((totalUsers - totalSubscribedUsers) / totalSubscribedUsers).toFixed(1) : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
