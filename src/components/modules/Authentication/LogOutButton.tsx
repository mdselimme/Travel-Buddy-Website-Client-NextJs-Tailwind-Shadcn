"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logOutUser } from "@/actions/auth/logOut";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

const LogOutButton = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const result = await logOutUser();
      if (result.success) {
        router.push("/login");
        toast.success(result.message || "Logged out successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };
  return (
    <Button onClick={handleLogOut} className="w-full text-white">
      LogOut
      <LogOut />
    </Button>
  );
};

export default LogOutButton;
