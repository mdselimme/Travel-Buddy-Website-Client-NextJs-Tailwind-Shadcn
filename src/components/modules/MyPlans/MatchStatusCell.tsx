"use client";
import { matchStatusUpdateAction } from "@/actions/matches/matchStatusUpdate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MatchStatus } from "@/types/matches.types";
import { useState } from "react";
import { toast } from "sonner";

interface MatchStatusCellProps {
  matchId: string;
  currentStatus: MatchStatus;
}

const MatchStatusCell = ({ matchId, currentStatus }: MatchStatusCellProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: MatchStatus) => {
    try {
      setIsUpdating(true);
      const result = await matchStatusUpdateAction({
        matchId,
        status: newStatus,
      });
      if (result.success) {
        setStatus(newStatus);
        toast.success(result.message || "Status updated successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Select
        value={status}
        onValueChange={(value) => handleStatusChange(value as MatchStatus)}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={MatchStatus.ACCEPTED}>
            {MatchStatus.ACCEPTED}
          </SelectItem>
          <SelectItem value={MatchStatus.REJECTED}>
            {MatchStatus.REJECTED}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MatchStatusCell;
