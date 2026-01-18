import { getAllUser } from "@/actions/user/getAllUser";
import ManageUsersTable from "../../../../../components/modules/ManageUsers/ManageUsersTable";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard Manage Users || Travel Buddy`,
  description: "Travel Buddy Manage Users Page to manage user roles.",
};

const ManageUser = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { limit, page } = await searchParams;
  const allUsers = await getAllUser({
    limit: Number(limit),
    page: Number(page),
  });

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
        <ManageUsersTable
          initialUsers={allUsers.data}
          pagination={allUsers.pagination}
        />
      </div>
    </div>
  );
};

export default ManageUser;
