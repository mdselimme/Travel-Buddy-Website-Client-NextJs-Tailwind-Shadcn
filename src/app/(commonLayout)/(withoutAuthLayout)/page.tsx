import FindTravelBuddies from "@/components/modules/Home/FindTravelBuddies";
import HowItWork from "@/components/modules/Home/HowItWork";
import MyMatchesTravelPlan from "@/components/modules/Home/MyMatchesTravelPlan";

const HomePage = () => {
  return (
    <div>
      <FindTravelBuddies />
      <MyMatchesTravelPlan />
      <HowItWork />
    </div>
  );
};

export default HomePage;
