import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMatch, MatchStatus } from "@/types/matches.types";
import Link from "next/link";
import MatchStatusCell from "./MatchStatusCell";

interface MatchesTableProps {
  matches: IMatch[];
}

const MatchesTable = ({ matches }: MatchesTableProps) => {
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-linear-to-r from-blue-50 to-cyan-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">
              Travel Plan
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Sender
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Actions
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => (
            <TableRow
              key={match._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {/* Travel Plan Title */}
              <TableCell className="font-medium">
                {match.travelPlanId?.travelTitle || "N/A"}
              </TableCell>

              {/* Sender Link */}
              <TableCell>
                <Link
                  href={`/profile/${match.senderId._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Sender
                </Link>
              </TableCell>

              {/* Status */}
              <TableCell>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    match.status
                  )}`}
                >
                  {match.status}
                </span>
              </TableCell>

              {/* Update Status Action */}
              <TableCell>
                <MatchStatusCell
                  matchId={match._id}
                  currentStatus={match.status}
                />
              </TableCell>

              {/* Date */}
              <TableCell className="text-sm text-gray-600">
                {match.createdAt
                  ? new Date(match.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchesTable;
