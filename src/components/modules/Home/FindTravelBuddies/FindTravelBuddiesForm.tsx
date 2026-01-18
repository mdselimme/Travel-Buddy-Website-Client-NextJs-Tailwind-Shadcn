"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FindTravelBuddiesFormProps {
  cities: string[];
}

const FindTravelBuddiesForm = ({ cities }: FindTravelBuddiesFormProps) => {
  const [selectedCity, setSelectedCity] = useState("");

  const exploreLink = selectedCity
    ? `/explore?search=${encodeURIComponent(selectedCity)}`
    : `/explore`;

  return (
    <div className="space-y-2 sm:space-y-3 flex flex-col items-center">
      <label className="text-xs sm:text-sm font-semibold text-blue-100 flex items-center gap-1.5 sm:gap-2">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
        Choose Your Destination From Our Available Cities
      </label>
      <div className="flex flex-col gap-3 sm:gap-4 items-center w-full max-w-md px-2 sm:px-0">
        <div className="w-full">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="bg-white/40 border-white/40 text-white text-sm sm:text-base h-10 sm:h-12 w-full rounded-lg">
              <SelectValue placeholder="Select a city to explore" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {cities?.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                  className="text-white hover:bg-cyan-600"
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href={exploreLink} className="w-full">
          <Button
            size="lg"
            className="bg-white text-cyan-600 hover:bg-blue-50 text-sm sm:text-base font-semibold w-full cursor-pointer h-10 sm:h-11"
          >
            Find Buddies
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FindTravelBuddiesForm;
