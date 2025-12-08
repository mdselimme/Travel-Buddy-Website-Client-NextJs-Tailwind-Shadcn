import PublicHeader from "@/components/Shared/PublicHeader";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
};

export default CommonLayout;
