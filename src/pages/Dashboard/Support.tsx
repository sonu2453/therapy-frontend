import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/ui/table/DataTable";
// import { SupportIcon } from "../../icons";
import { useEffect, useState } from "react";

interface Support {
  id: number;
  name: string;
  role_name: string;
  status: number;
  last_active_at: string;
}

const columns = [
  {
    header: "Support",
    accessor: (support: Support) => (
      <div className="flex items-center gap-3">
        <div className="w-10 aspect-square rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-black text-sm font-semibold border border-black">
          {support.name?.charAt(0).toUpperCase()}
        </div>
        <div className="font-medium text-gray-900 dark:text-white">
          {support.name || "Unknown Support"}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {support.role_name}
        </div>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (support: Support) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          support.status === 1
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : support.status === 2
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }`}
      >
        {support.status === 1
          ? "Available"
          : support.status === 2
          ? "Busy"
          : "Unknown"}
      </span>
    ),
  },
  {
    header: "Last Active",
    accessor: (support: Support) => support.last_active_at,
  },
];

export default function Support() {
  const [supports, setSupports] = useState<Support[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const getApiBaseUrl = () => {
    // Access the variable using import.meta.env
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${getApiBaseUrl()}/api/support`);
      const usersData = res.data.data || res.data;
      console.log(usersData, "supportsData");
      setSupports(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <>
      <PageMeta title="Support | Dashboard" description="Manage your support users" />
      <PageBreadcrumb pageTitle="Support" />
      <DataTable
        title="Support"
        description="Manage your support users and their status"
        columns={columns}
        data={supports}
        onRowClick={(support) => {
          console.log("Clicked support:", support);
        }}
      />
    </>
  );
}
