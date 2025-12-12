"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader } from "lucide-react";

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

  const handleRequestToJoin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement request to join action
      console.log(
        "Requesting to join plan:",
        travelPlanId,
        "from host:",
        hostId
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsRequested(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Request failed:", error);
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
