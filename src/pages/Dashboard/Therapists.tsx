import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/ui/table/DataTable";
import { TherapistIcon } from "../../icons";

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  status: "available" | "busy" | "offline";
  lastActive: string;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychology",
    experience: "10 years",
    status: "available",
    lastActive: "2024-03-15 10:30",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Cognitive Behavioral Therapy",
    experience: "8 years",
    status: "busy",
    lastActive: "2024-03-15 09:15",
  },
  // Add more therapists as needed
];

const columns = [
  {
    header: "Therapist",
    accessor: (therapist: Therapist) => (
      <div className="flex items-center gap-3">
        <TherapistIcon className="size-8" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {therapist.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {therapist.specialization}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Experience",
    accessor: (therapist: Therapist) => therapist.experience,
  },
  {
    header: "Status",
    accessor: (therapist: Therapist) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          therapist.status === "available"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : therapist.status === "busy"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }`}
      >
        {therapist.status}
      </span>
    ),
  },
  {
    header: "Last Active",
    accessor: (therapist: Therapist) => therapist.lastActive,
  },
];

export default function Therapists() {
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