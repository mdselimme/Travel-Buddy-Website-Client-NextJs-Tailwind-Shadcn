import PublicFooter from "@/components/Shared/PublicFooter";
import PublicHeader from "@/components/Shared/PublicHeader";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <div className="grow">{children}</div>
      <PublicFooter />
    </div>
  );
};

export default CommonLayout;
