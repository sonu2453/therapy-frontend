import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { TherapistIcon } from "../../../icons";
import { ReactNode } from "react";

interface TherapistEarning {
  id: number;
  therapistName: string;
  specialization: string;
  sessions: number;
  earnings: number;
  commission: number;
  period: string;
  lastPayout: string;
  status: "paid" | "pending" | "processing";
}

const therapistEarnings: TherapistEarning[] = [
  {
    id: 1,
    therapistName: "Dr. Sarah Johnson",
    specialization: "Clinical Psychology",
    sessions: 45,
    earnings: 4500,
    commission: 0.1,
    period: "2024-03-01",
    lastPayout: "2024-03-01",
    status: "paid",
  },
  {
    id: 2,
    therapistName: "Dr. Michael Chen",
    specialization: "Cognitive Behavioral Therapy",
    sessions: 38,
    earnings: 3800,
    commission: 0.1,
    period: "2024-03-01",
    lastPayout: "2024-03-01",
    status: "pending",
  },
  {
    id: 3,
    therapistName: "Dr. Emily Wilson",
    specialization: "Family Therapy",
    sessions: 42,
    earnings: 4200,
    commission: 0.1,
    period: "2024-03-01",
    lastPayout: "2024-03-01",
    status: "processing",
  },
];

const columns = [
  {
    header: "Therapist",
    accessor: (earning: TherapistEarning): ReactNode => (
      <div className="flex items-center gap-3">
        <TherapistIcon className="size-8" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {earning.therapistName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {earning.specialization}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Sessions",
    accessor: (earning: TherapistEarning): ReactNode => String(earning.sessions),
  },
  {
    header: "Earnings",
    accessor: (earning: TherapistEarning): ReactNode => (
      <span className="font-medium text-gray-900 dark:text-white">
        ${earning.earnings.toFixed(2)}
      </span>
    ),
  },
  {
    header: "Commission",
    accessor: (earning: TherapistEarning): ReactNode => (
      <span className="font-medium text-gray-900 dark:text-white">
        ${earning.commission.toFixed(2)}
      </span>
    ),
  },
  {
    header: "Period",
    accessor: (earning: TherapistEarning): ReactNode => earning.period,
  },
  {
    header: "Status",
    accessor: (earning: TherapistEarning): ReactNode => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          earning.status === "paid"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : earning.status === "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        }`}
      >
        {earning.status}
      </span>
    ),
  },
];

export default function Therapists() {
  const totalEarnings = therapistEarnings.reduce(
    (sum, earning) => sum + earning.earnings,
    0
  );
  const totalCommission = therapistEarnings.reduce(
    (sum, earning) => sum + earning.commission,
    0
  );

  return (
    <>
      <PageMeta
        title="Therapist Earnings | Dashboard"
        description="View and manage therapist earnings"
      />
      <PageBreadcrumb pageTitle="Therapist Earnings" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Earnings
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Commission
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${totalCommission.toFixed(2)}
          </p>
        </div>
      </div>
      <DataTable
        title="Therapist Earnings"
        description="View and manage therapist earnings"
        columns={columns}
        data={therapistEarnings}
        onRowClick={(earning) => {
          // Handle row click, e.g., navigate to earning details
          console.log("Clicked earning:", earning);
        }}
      />
    </>
  );
} 