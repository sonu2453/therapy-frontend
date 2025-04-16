import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { ReactNode } from "react";

interface ManualAdjustment {
  id: number;
  customerName: string;
  planName: string;
  amount: number;
  type: "credit" | "debit";
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  processedBy?: string;
  processedDate?: string;
}

const manualAdjustments: ManualAdjustment[] = [
  {
    id: 1,
    customerName: "John Doe",
    planName: "Premium Plan",
    amount: 50.00,
    type: "credit",
    reason: "Service credit for downtime",
    date: "2024-03-15",
    status: "approved",
    processedBy: "Admin User",
    processedDate: "2024-03-15",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    planName: "Basic Plan",
    amount: 25.00,
    type: "debit",
    reason: "Additional service usage",
    date: "2024-03-14",
    status: "pending",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    planName: "Premium Plan",
    amount: 100.00,
    type: "credit",
    reason: "Loyalty bonus",
    date: "2024-03-13",
    status: "rejected",
    processedBy: "Admin User",
    processedDate: "2024-03-14",
  },
];

const columns = [
  {
    header: "Customer",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <div>
        <div className="font-medium text-gray-900 dark:text-white">
          {adjustment.customerName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {adjustment.planName}
        </div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <span className={`font-medium ${adjustment.type === "credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
        {adjustment.type === "credit" ? "+" : "-"}${adjustment.amount.toFixed(2)}
      </span>
    ),
  },
  {
    header: "Type",
    accessor: (adjustment: ManualAdjustment): ReactNode => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        adjustment.type === "credit"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      }`}>
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
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        adjustment.status === "pending"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          : adjustment.status === "approved"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      }`}>
        {adjustment.status}
      </span>
    ),
  },
];

export default function ManualAdjustments() {
  const pendingAdjustments = manualAdjustments.filter(
    (adjustment) => adjustment.status === "pending"
  ).length;
  const totalCreditAmount = manualAdjustments
    .filter((adjustment) => adjustment.type === "credit")
    .reduce((sum, adjustment) => sum + adjustment.amount, 0);
  const totalDebitAmount = manualAdjustments
    .filter((adjustment) => adjustment.type === "debit")
    .reduce((sum, adjustment) => sum + adjustment.amount, 0);

  return (
    <>
      <PageMeta
        title="Manual Adjustments | Dashboard"
        description="Manage manual billing adjustments"
      />
      <PageBreadcrumb pageTitle="Manual Adjustments" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Pending Adjustments
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {pendingAdjustments}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Credits
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            +${totalCreditAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Debits
          </h3>
          <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
            -${totalDebitAmount.toFixed(2)}
          </p>
        </div>
      </div>
      <DataTable
        title="Manual Adjustments"
        description="Manage billing adjustments and credits"
        columns={columns}
        data={manualAdjustments}
        onRowClick={(adjustment) => {
          // Handle row click, e.g., navigate to adjustment details
          console.log("Clicked adjustment:", adjustment);
        }}
      />
    </>
  );
} 