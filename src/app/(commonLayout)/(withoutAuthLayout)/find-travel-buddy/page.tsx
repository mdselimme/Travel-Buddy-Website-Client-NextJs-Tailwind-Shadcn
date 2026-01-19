import { getAllProfiles } from "@/actions/profile/getAllProfiles";
import { ITravelBuddyProfile } from "@/types/travelBuddy.types";
import TravelBuddyCard from "@/components/modules/FindTravelBuddy/TravelBuddyCard";
import { Metadata } from "next";
import PaginationBox from "@/components/Shared/PagintationBox";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Find Travel Buddy || Travel Buddy`,
  description:
    "Travel Buddy Find Travel Buddy Page to connect with fellow travelers.",
};

const FindTravelBuddy = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, limit } = await searchParams;

  const { data: allProfiles, pagination } = await getAllProfiles({
    page: Number(page),
    limit: Number(limit),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Find Your Travel Buddy
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow travelers and explore the world together
        </p>
        {allProfiles && (
          <p className="text-sm text-gray-500 mt-2">
            {allProfiles.length}{" "}
            {allProfiles.length === 1 ? "buddy" : "buddies"} available
          </p>
        )}
      </div>

      {/* Profiles Grid */}
      {allProfiles && allProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProfiles.map((profile: ITravelBuddyProfile) => (
            <TravelBuddyCard key={profile._id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No travel buddies found</p>
          <p className="text-sm text-gray-400 mt-2">
            Check back later for new travel companions
          </p>
        </div>
      )}
      <div>
        <PaginationBox
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
};

export default FindTravelBuddy;
