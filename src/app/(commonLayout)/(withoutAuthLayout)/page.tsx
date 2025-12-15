import HowItWork from "@/components/modules/Home/HowItWork";
import MyMatchesTravelPlan from "@/components/modules/TravelPlan/MyMatchesTravelPlan";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <MyMatchesTravelPlan />
      <HowItWork />
    </div>
  );
};

export default HomePage;
