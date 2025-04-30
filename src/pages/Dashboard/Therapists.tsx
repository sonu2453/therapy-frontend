import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/ui/table/DataTable";
// import { TherapistIcon } from "../../icons";
import { useEffect, useState } from "react";

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  experience_years: string;
  status: number;
  last_active_at: string;
}

const columns = [
  {
    header: "Therapist",
    accessor: (therapist: Therapist) => (
      <div className="flex items-center gap-3">
        {/* <TherapistIcon className="size-8" /> */}
        <div className="w-10 aspect-square rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-black text-sm font-semibold border border-black">
            {therapist.name?.charAt(0).toUpperCase()}
          </div>
          <div className="font-medium text-gray-900 dark:text-white">
            {therapist.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {therapist.specialization}
          </div>
        </div>
    ),
  },
  {
    header: "Experience",
    accessor: (therapist: Therapist) => therapist.experience_years,
  },
  {
    header: "Status",
    accessor: (therapist: Therapist) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          therapist.status === 1
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" // For status "available"
            : therapist.status === 2
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" // For status "busy"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" // Default case
        }`}
      >
        {therapist.status === 1
          ? "Available"
          : therapist.status === 2
          ? "Busy"
          : "Unknown"}
      </span>
    ),
  },  
  {
    header: "Last Active",
    accessor: (therapist: Therapist) => therapist.last_active_at,
  },
];

export default function Therapists() {
    const [therapists, settherapists] = useState<Therapist[]>([]);
    useEffect(() => {
      fetchUsers();
    }, []);
    const getApiBaseUrl = () => {
      // Access the variable using import.meta.env
      return import.meta.env.VITE_API_URL || "http://localhost:8000";
    };
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/api/therapist`);
        const usersData = res.data.data || res.data; // adjust depending on your API
        console.log(usersData, "usersData")
        settherapists(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
  return (
    <>
      <PageMeta
        title="Therapists | Dashboard"
        description="Manage your therapists"
      />
      <PageBreadcrumb pageTitle="Therapists" />
      <DataTable
        title="Therapists"
        description="Manage your therapists and their availability"
        columns={columns}
        data={therapists}
        onRowClick={(therapist) => {
          // Handle row click, e.g., navigate to therapist details
          console.log("Clicked therapist:", therapist);
        }}
      />
    </>
  );
} 