"use server";
import { getAvailableCities } from "@/actions/TravelPlan/getAvailableCities";
import FindTravelBuddiesHero from "./FindTravelBuddiesHero";

const FindTravelBuddies = async () => {
  const allCities: string[] = await getAvailableCities();

  return (
    <div className="py-16">
      <FindTravelBuddiesHero cities={allCities} />
    </div>
  );
};

export default FindTravelBuddies;
