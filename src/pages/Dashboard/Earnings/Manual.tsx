import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { ReactNode } from "react";

interface ManualAdjustment {
  id: number;
  therapistName: string;
  amount: number;
  type: "bonus" | "deduction" | "correction";
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const adjustments: ManualAdjustment[] = [
  {
    id: 1,
    therapistName: "Dr. Sarah Johnson",
    amount: 200,
    type: "bonus",
    reason: "Performance bonus for March",
    date: "2024-03-15",
    status: "approved",
  },
  {
    id: 2,
    therapistName: "Dr. Michael Chen",
    amount: -100,
    type: "deduction",
    reason: "Late cancellation fee",
    date: "2024-03-14",
    status: "pending",
  },
];

const columns = [
  {
    header: "Therapist",
    accessor: (adjustment: ManualAdjustment): ReactNode => adjustment.therapistName,
  },
  {
    header: "Amount",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <div
        className={`font-medium ${
          adjustment.amount >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        ${Math.abs(adjustment.amount).toLocaleString()}
      </div>
    ),
  },
  {
    header: "Type",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          adjustment.type === "bonus"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : adjustment.type === "deduction"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        }`}
      >
        {adjustment.type}
      </span>
    ),
  },
  {
    header: "Reason",
    accessor: (adjustment: ManualAdjustment): ReactNode => adjustment.reason,
  },
  {
    header: "Date",
    accessor: (adjustment: ManualAdjustment): ReactNode => adjustment.date,
  },
  {
    header: "Status",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          adjustment.status === "approved"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : adjustment.status === "rejected"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        }`}
      >
        {adjustment.status}
      </span>
    ),
  },
];

export default function ManualAdjustments() {
  return (
    <>
      <PageMeta
        title="Manual Adjustments | Dashboard"
        description="Manage manual earnings adjustments"
      />
      <PageBreadcrumb pageTitle="Manual Adjustments" />
      <DataTable
        title="Manual Adjustments"
        description="View and manage manual earnings adjustments"
        columns={columns}
        data={adjustments}
        onRowClick={(adjustment) => {
          // Handle row click, e.g., navigate to adjustment details
          console.log("Clicked adjustment:", adjustment);
        }}
      />
    </>
  );
} 