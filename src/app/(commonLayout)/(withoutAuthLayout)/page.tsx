import FindTravelBuddies from "@/components/modules/Home/FindTravelBuddies";
import HowItWork from "@/components/modules/Home/HowItWork";
import MyMatchesTravelPlan from "@/components/modules/Home/MyMatchesTravelPlan";
import ReviewsSection from "@/components/modules/Home/ReviewsSection";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
export const dynamic = "force-dynamic";
const HomePage = () => {
  return (
    <div>
      <FindTravelBuddies />
      <MyMatchesTravelPlan />
      <HowItWork />
      <WhyChooseUs />
      <ReviewsSection />
    </div>
  );
};

export default HomePage;
