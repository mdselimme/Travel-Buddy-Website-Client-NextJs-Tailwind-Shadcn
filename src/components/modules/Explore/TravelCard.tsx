import Link from "next/link";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travel.plan.types";
import Image from "next/image";

interface TravelCardProps {
  plan: ITravelPlan;
}

const TravelCard = ({ plan }: TravelCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {plan.thumbnail ? (
          <Image
            src={plan.thumbnail}
            alt={plan.travelTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600 text-white text-4xl">
            ✈️
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {plan.travelTitle}
        </h3>

        {/* Destination */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} className="text-red-500" />
          <span className="text-sm">
            {plan.destination.city}, {plan.destination.country}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={18} className="text-blue-500" />
          <span className="text-sm">
            {new Date(plan.startDate).toLocaleDateString()} -{" "}
            {new Date(plan.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Budget Range */}
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign size={18} className="text-green-500" />
          <span className="text-sm font-semibold">
            ${plan.budgetRange.min} - ${plan.budgetRange.max}
          </span>
        </div>

        {/* View Details Button */}
        <Link href={`/travel-plans/${plan._id}`}>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default TravelCard;
