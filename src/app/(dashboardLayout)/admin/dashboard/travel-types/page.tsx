import { getAllTravelType } from "@/actions/travelType/getAllTravelType";
import AddTravelTypeDialog from "@/components/modules/TravelTypes/AddTravelTypeDialog";
import TravelTypesList from "@/components/modules/TravelTypes/TravelTypesList";
import { Card } from "@/components/ui/card";
export const dynamic = "force-dynamic";
const TravelTypesManagementPage = async () => {
  const { data: allTravelTypes } = await getAllTravelType();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Travel Types Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all travel types in your system
          </p>
        </div>

        {/* Add Travel Type Form */}
        <AddTravelTypeDialog />

        {/* Travel Types Table */}
        {!allTravelTypes || allTravelTypes.length === 0 ? (
          <Card className="mt-8 p-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl">📭</div>
              <h3 className="text-2xl font-bold text-gray-900">
                No Travel Types Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Start by creating your first travel type using the form above.
                This will help users categorize their travel plans.
              </p>
            </div>
          </Card>
        ) : (
          <TravelTypesList initialTravelTypes={allTravelTypes} />
        )}
      </div>
    </div>
  );
};

export default TravelTypesManagementPage;
