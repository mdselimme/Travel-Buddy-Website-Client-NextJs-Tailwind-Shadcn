import { getAllUser } from "@/actions/user/getAllUser";
import ManageUsersTable from "../../../../../components/modules/ManageUsers/ManageUsersTable";
export const dynamic = "force-dynamic";
const ManageUser = async () => {
  const allUsers = await getAllUser({ limit: 10, page: 1 });

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all users in the system.
        </p>
      </div>

      {/* Users Table */}
      <div className="mt-10">
        <ManageUsersTable initialUsers={allUsers.data} />
      </div>
    </div>
  );
};

export default ManageUser;
