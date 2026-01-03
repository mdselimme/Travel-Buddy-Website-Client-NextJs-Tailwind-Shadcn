import ChangePasswordForm from "@/components/modules/MyProfile/ChangePassword";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Dashboard Change Password || Travel Buddy`,
  description: "Dashboard Change Password Page",
};

const ChangePasswordPage = async () => {
  return (
    <div>
      <div className="w-full md:w-[780px] mx-auto mt-24">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-semibold capitalize text-2xl">
                Change Password
              </CardTitle>
            </CardHeader>
            <ChangePasswordForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
