"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/tokenHandlers";
import { getUserInfo } from "@/actions/user/getUserInfo";
import { requestMatchAction } from "@/actions/matches/requestMatch";
import { toast } from "sonner";

interface RequestToJoinButtonProps {
  travelPlanId: string;
  hostId: string;
  onSuccess?: () => void;
}

export default function RequestToJoinButton({
  travelPlanId,
  hostId,
  onSuccess,
}: RequestToJoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const router = useRouter();

  const handleRequestToJoin = async () => {
    setIsLoading(true);
    const accessToken = await getCookie("accessToken");
    try {
      if (!accessToken) {
        router.push("/login");
        return;
      }

      const user = await getUserInfo();
      if (!user) {
        router.push("/login");
        return;
      }

      const matchesData = {
        travelPlanId,
        senderId: user._id as string,
        receiverId: hostId as string,
      };

      const result = await requestMatchAction(matchesData);
      if (result.success) {
        toast.success(result.message || "Request sent successfully!");
        setIsRequested(true);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send request."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleRequestToJoin}
      disabled={isLoading || isRequested}
      className="w-full bg-primary hover:bg-primary/90 text-secondary-foreground flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Sending Request...
        </>
      ) : isRequested ? (
        <>
          <MessageSquare className="w-4 h-4" />
          Request Sent
        </>
      ) : (
        <>
          <MessageSquare className="w-4 h-4" />
          Request to Join
        </>
      )}
    </Button>
  );
}
