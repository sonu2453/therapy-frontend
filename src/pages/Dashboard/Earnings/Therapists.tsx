import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { DollarLineIcon } from "../../../icons";

interface TherapistEarning {
  id: number;
  therapistName: string;
  totalSessions: number;
  totalEarnings: number;
  pendingPayout: number;
  lastPayout: string;
  status: "paid" | "pending" | "processing";
}

const earnings: TherapistEarning[] = [
  {
    id: 1,
    therapistName: "Dr. Sarah Johnson",
    totalSessions: 45,
    totalEarnings: 4500,
    pendingPayout: 1200,
    lastPayout: "2024-03-01",
    status: "pending",
  },
  {
    id: 2,
    therapistName: "Dr. Michael Chen",
    totalSessions: 38,
    totalEarnings: 3800,
    pendingPayout: 800,
    lastPayout: "2024-03-01",
    status: "processing",
  },
];

const columns = [
  {
    header: "Therapist",
    accessor: (earning: TherapistEarning) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {earning.therapistName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {earning.totalSessions} sessions
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Total Earnings",
    accessor: (earning: TherapistEarning) => (
      <div className="font-medium text-gray-900 dark:text-white">
        ${earning.totalEarnings.toLocaleString()}
      </div>
    ),
  },
  {
    header: "Pending Payout",
    accessor: (earning: TherapistEarning) => (
      <div className="font-medium text-primary-600 dark:text-primary-400">
        ${earning.pendingPayout.toLocaleString()}
      </div>
    ),
  },
  {
    header: "Last Payout",
    accessor: "lastPayout",
  },
  {
    header: "Status",
    accessor: (earning: TherapistEarning) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          earning.status === "paid"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : earning.status === "processing"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }`}
      >
        {earning.status}
      </span>
    ),
  },
];

export default function TherapistEarnings() {
  return (
    <>
      <PageMeta
        title="Therapist Earnings | Dashboard"
        description="View and manage therapist earnings"
      />
      <PageBreadcrumb pageTitle="Therapist Earnings" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${earnings.reduce((sum, e) => sum + e.totalEarnings, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Payouts</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${earnings.reduce((sum, e) => sum + e.pendingPayout, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Therapist Earnings"
        description="View and manage therapist earnings and payouts"
        columns={columns}
        data={earnings}
        onRowClick={(earning) => {
          // Handle row click, e.g., navigate to earning details
          console.log("Clicked earning:", earning);
        }}
      />
    </>
  );
} 