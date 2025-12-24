"use server";
import { getAllTravelsPlans } from "@/actions/TravelPlan/getAllTravelPlans";
import { getMyMatchesTravelPlan } from "@/actions/TravelPlan/getMyMatchesTravelPlan";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCookie } from "@/lib/tokenHandlers";
import { ITravelPlan } from "@/types/travel.plan.types";
import { Calendar, MapPin, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyMatchesTravelPlan = async () => {
  const token = await getCookie("accessToken");
  const isLoggedIn = !!token;

  let travelPlans: ITravelPlan[] = [];

  if (isLoggedIn) {
    // Fetch user's matched travel plans
    const myMatches = await getMyMatchesTravelPlan();
    travelPlans = myMatches?.slice(0, 3) || [];
    if (travelPlans.length === 0) {
      // If no matched plans, fetch all travel plans as fallback
      const { data: allPlans } = await getAllTravelsPlans();
      travelPlans = allPlans?.slice(0, 3) || [];
    }
  } else {
    // Fetch all travel plans
    const { data: allPlans } = await getAllTravelsPlans();
    travelPlans = allPlans?.slice(0, 3) || [];
  }

  if (travelPlans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No travel plans available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto my-8 px-4">
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">
          {isLoggedIn
            ? "🎯 Your Matched Travel Plans"
            : "🌍 Explore Travel Plans"}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {isLoggedIn
            ? "Travel plans matched with your interests"
            : "Discover exciting travel opportunities"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {travelPlans.map((plan: ITravelPlan) => (
          <Card
            key={plan._id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Travel Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-200">
              {plan.thumbnail ? (
                <Image
                  src={plan.thumbnail}
                  alt={plan.travelTitle}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-300">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-bold text-lg line-clamp-2">
                {plan.travelTitle}
              </h3>

              {/* Destination */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">
                  {plan.destination.city}, {plan.destination.country}
                </span>
              </div>

              {/* Start Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(plan.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                <Wallet className="h-4 w-4" />
                <span>
                  ${plan.budgetRange.min?.toLocaleString()} - $
                  {plan.budgetRange.max?.toLocaleString()}
                </span>
              </div>

              {/* View Details Button */}
              <Link href={`/travel-plans/${plan._id}`} className="block">
                <Button
                  variant="default"
                  className="w-full text-secondary cursor-pointer"
                >
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Travel Plans Button */}
      <div className="flex justify-center pt-4">
        <Link href="/explore">
          <Button
            size="lg"
            variant="default"
            className="px-8 cursor-pointer text-white"
          >
            View All Travel Plans
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyMatchesTravelPlan;
