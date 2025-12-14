import AddTravelTypeForm from "./AddTravelTypeForm";
import { Card } from "@/components/ui/card";

interface AddTravelTypeDialogProps {
  onSuccess?: () => void;
}

const AddTravelTypeDialog = ({ onSuccess }: AddTravelTypeDialogProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add Travel Type</h2>
        <p className="text-gray-600 text-sm mt-1">
          Create a new travel type that users can select for their plans
        </p>
      </div>
      <AddTravelTypeForm onSuccess={onSuccess} />
    </Card>
  );
};

export default AddTravelTypeDialog;
