import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { ReactNode } from "react";

interface RefundRequest {
  id: number;
  customerName: string;
  planName: string;
  amount: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  processedDate?: string;
}

const refundRequests: RefundRequest[] = [
  {
    id: 1,
    customerName: "John Doe",
    planName: "Premium Plan",
    amount: 99.99,
    requestDate: "2024-03-15",
    status: "pending",
    reason: "Service not as expected",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    planName: "Basic Plan",
    amount: 49.99,
    requestDate: "2024-03-14",
    status: "approved",
    reason: "Changed mind",
    processedDate: "2024-03-15",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    planName: "Premium Plan",
    amount: 99.99,
    requestDate: "2024-03-13",
    status: "rejected",
    reason: "Outside refund window",
    processedDate: "2024-03-14",
  },
];

const columns = [
  {
    header: "Customer",
    accessor: (request: RefundRequest): ReactNode => (
      <div>
        <div className="font-medium text-gray-900 dark:text-white">
          {request.customerName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {request.planName}
        </div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (request: RefundRequest): ReactNode => (
      <span className="font-medium">
        ${request.amount.toFixed(2)}
      </span>
    ),
  },
  {
    header: "Request Date",
    accessor: (request: RefundRequest): ReactNode => request.requestDate,
  },
  {
    header: "Reason",
    accessor: (request: RefundRequest): ReactNode => request.reason,
  },
  {
    header: "Status",
    accessor: (request: RefundRequest): ReactNode => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          request.status === "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : request.status === "approved"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {request.status}
      </span>
    ),
  },
];

export default function RefundRequests() {
  const pendingRequests = refundRequests.filter(
    (request) => request.status === "pending"
  ).length;
  const totalRefundAmount = refundRequests.reduce(
    (sum, request) => sum + request.amount,
    0
  );

  return (
    <>
      <PageMeta
        title="Refund Requests | Dashboard"
        description="Manage refund requests"
      />
      <PageBreadcrumb pageTitle="Refund Requests" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Pending Requests
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {pendingRequests}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Refund Amount
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${totalRefundAmount.toFixed(2)}
          </p>
        </div>
      </div>
      <DataTable
        title="Refund Requests"
        description="Manage and process refund requests"
        columns={columns}
        data={refundRequests}
        onRowClick={(request) => {
          // Handle row click, e.g., navigate to request details
          console.log("Clicked request:", request);
        }}
      />
    </>
  );
} 