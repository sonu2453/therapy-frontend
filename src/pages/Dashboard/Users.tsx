import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable, { Column } from "../../components/ui/table/DataTable";
import { UserCircleIcon } from "../../icons";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-03-15 10:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-03-14 15:45",
  },
  // Add more users as needed
];

const columns : Column<User>[] = [
  {
    header: "User",
    accessor: (user: User) => (
      <div className="flex items-center gap-3">
        <UserCircleIcon className="size-8" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {user.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: "role",
  },
  {
    header: "Status",
    accessor: (user: User) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          user.status === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    header: "Last Login",
    accessor: "lastLogin",
  },
];

export default function Users() {
  return (
    <>
      <PageMeta
        title="Users | Dashboard"
        description="Manage your users"
      />
      <PageBreadcrumb pageTitle="Users" />
      <DataTable
        title="Users"
        description="Manage your users and their permissions"
        columns={columns}
        data={users}
        onRowClick={(user) => {
          // Handle row click, e.g., navigate to user details
          console.log("Clicked user:", user);
        }}
      />
    </>
  );
} 