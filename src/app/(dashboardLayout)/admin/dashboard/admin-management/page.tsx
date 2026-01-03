import { Metadata } from "next";
import UpdateUserRoleForm from "../../../../../components/modules/Dashboard/UpdateUserRoleForm";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard Admin Management || Travel Buddy`,
  description: "Travel Buddy Admin Management Page to manage user roles.",
};

const AdminManagementPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-center">
        <UpdateUserRoleForm />
      </div>
    </div>
  );
};

export default AdminManagementPage;
