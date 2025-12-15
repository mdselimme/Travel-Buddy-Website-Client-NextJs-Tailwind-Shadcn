import { Users } from "lucide-react";
import FindTravelBuddiesForm from "./FindTravelBuddiesForm";

interface FindTravelBuddiesHeroProps {
  cities: string[];
}

const FindTravelBuddiesHero = ({ cities }: FindTravelBuddiesHeroProps) => {
  return (
    <div className="bg-linear-to-br from-blue-500 via-teal-500 to-cyan-600 rounded-3xl p-16 text-white overflow-hidden relative w-[60vw] mx-auto">
      <div className="space-y-8 text-center">
        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-5xl font-bold mb-3">
              Find Your Travel Buddies
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with like-minded travelers, share experiences, and create
              unforgettable memories together.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-lg">
            <div className="bg-white/20 rounded-full p-3">
              <Users className="h-6 w-6" />
            </div>
            <span>Join thousands of adventurous travelers</span>
          </div>
        </div>

        {/* Form Component */}
        <FindTravelBuddiesForm cities={cities} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36"></div>
    </div>
  );
};

export default FindTravelBuddiesHero;
