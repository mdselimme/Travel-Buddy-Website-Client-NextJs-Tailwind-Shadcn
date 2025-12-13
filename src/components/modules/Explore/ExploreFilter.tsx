"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { ITravelType } from "@/types/travel.type";

interface FilterSectionProps {
  travelTypes: ITravelType[];
}

const ExploreFilter = ({ travelTypes = [] }: FilterSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [date, setDate] = useState(searchParams.get("startDate") || "");
  const [travelType, setTravelType] = useState(
    searchParams.get("travelType") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (date) params.append("startDate", date);
    if (travelType) params.append("travelType", travelType);

    const queryString = params.toString();
    router.push(`/explore${queryString ? `?${queryString}` : ""}`);
  };

  const handleRefresh = () => {
    setSearch("");
    setDate("");
    setTravelType("");
    router.push("/explore");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Destination Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            placeholder="Enter destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Travel Type Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Travel Type
          </label>
          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Travel Types</option>
            {travelTypes?.map((type: ITravelType) => (
              <option key={type._id} value={type.typeName}>
                {type.typeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleRefresh}
          className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ExploreFilter;
