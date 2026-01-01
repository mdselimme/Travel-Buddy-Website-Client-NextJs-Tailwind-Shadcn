import { Users } from "lucide-react";
import FindTravelBuddiesForm from "./FindTravelBuddiesForm";

interface FindTravelBuddiesHeroProps {
  cities: string[];
}

const FindTravelBuddiesHero = ({ cities }: FindTravelBuddiesHeroProps) => {
  return (
    <div className="bg-linear-to-br from-blue-500 via-teal-500 to-cyan-600 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-white overflow-hidden relative w-full sm:w-[90vw] md:w-[80vw] lg:w-[60vw] mx-auto">
      <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center">
        {/* Content */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
              Find Your Travel Buddies
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              Connect with like-minded travelers, share experiences, and create
              unforgettable memories together.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg">
            <div className="bg-white/20 rounded-full p-2 sm:p-2.5 md:p-3">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
            <span>Join thousands of adventurous travelers</span>
          </div>
        </div>

        {/* Form Component */}
        <FindTravelBuddiesForm cities={cities} />
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full -mr-32 lg:-mr-48 -mt-32 lg:-mt-48"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 lg:w-72 lg:h-72 bg-white/5 rounded-full -ml-24 lg:-ml-36 -mb-24 lg:-mb-36"></div>
    </div>
  );
};

export default FindTravelBuddiesHero;
