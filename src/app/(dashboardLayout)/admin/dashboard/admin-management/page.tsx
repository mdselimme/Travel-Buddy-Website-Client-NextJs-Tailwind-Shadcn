import React from "react";
import UpdateUserRoleForm from "../../../../../components/modules/Dashboard/UpdateUserRoleForm";
export const dynamic = "force-dynamic";
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
