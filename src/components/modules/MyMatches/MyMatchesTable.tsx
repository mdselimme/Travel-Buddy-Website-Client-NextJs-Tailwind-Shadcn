"use client";

import { IMatch, MatchStatus } from "@/types/matches.types";
import { TravelPlanStatus } from "@/types/travel.plan.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import MyMatchesReviewModal from "./MyMatchesReviewModal";

interface MyMatchesTableProps {
  matches: IMatch[];
  userId: string;
}

export default function MyMatchesTable({
  matches,
  userId,
}: MyMatchesTableProps) {
  const getStatusColor = (status: MatchStatus) => {
    switch (status) {
      case MatchStatus.ACCEPTED:
        return "bg-green-100 text-green-800";
      case MatchStatus.REJECTED:
        return "bg-red-100 text-red-800";
      case MatchStatus.REQUESTED:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No matches found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-linear-to-r from-blue-50 to-cyan-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">
              Travel Title
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Match With
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Match Status
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => (
            <TableRow
              key={match._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {/* Travel Title */}
              <TableCell className="font-medium">
                {match.travelPlanId?.travelTitle || "N/A"}
              </TableCell>

              {/* Match With - Show the other person's name */}
              <TableCell className="font-medium">
                {userId === match.receiverId._id
                  ? match.senderId?.profile?.fullName || "N/A"
                  : match.receiverId?.profile?.fullName || "N/A"}
              </TableCell>

              {/* Match Status */}
              <TableCell>
                <Badge className={getStatusColor(match.status)}>
                  {match.status}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right space-x-2 flex justify-end">
                <Link href={`/travel-plans/${match.travelPlanId?._id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Travel Plan
                  </Button>
                </Link>

                {/* Leave Review Button - Show if plan is COMPLETED and userId is senderId (not receiverId) */}
                {match.travelPlanId &&
                  match.travelPlanId.travelPlanStatus ===
                    TravelPlanStatus.COMPLETED &&
                  userId === match.senderId._id && (
                    <MyMatchesReviewModal match={match} userId={userId} />
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
