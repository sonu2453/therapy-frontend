import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable, { Column } from "../../../components/ui/table/DataTable";
import { DollarLineIcon } from "../../../icons";

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
    planName: "Professional Plan",
    amount: 59.99,
    requestDate: "2024-03-15",
    status: "pending",
    reason: "Service not as expected",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    planName: "Basic Plan",
    amount: 29.99,
    requestDate: "2024-03-14",
    status: "approved",
    reason: "Technical issues",
    processedDate: "2024-03-15",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    planName: "Enterprise Plan",
    amount: 99.99,
    requestDate: "2024-03-13",
    status: "rejected",
    reason: "Outside refund window",
    processedDate: "2024-03-14",
  },
];

const columns : Column<RefundRequest>[] = [
  {
    header: "Customer",
    accessor: (request: RefundRequest) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {request.customerName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {request.planName}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (request: RefundRequest) => (
      <div className="font-medium text-gray-900 dark:text-white">
        ${request.amount.toFixed(2)}
      </div>
    ),
  },
  {
    header: "Request Date",
    accessor: "requestDate",
  },
  {
    header: "Reason",
    accessor: "reason",
  },
  {
    header: "Status",
    accessor: (request: RefundRequest) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          request.status === "approved"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : request.status === "rejected"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        }`}
      >
        {request.status}
      </span>
    ),
  },
];

export default function RefundRequests() {
  const pendingRequests = refundRequests.filter(r => r.status === "pending");
  const totalRefundAmount = refundRequests.reduce((sum, r) => sum + r.amount, 0);

  return (
    <>
      <PageMeta
        title="Refund Requests | Dashboard"
        description="Manage subscription refund requests"
      />
      <PageBreadcrumb pageTitle="Refund Requests" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {pendingRequests.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Refund Amount</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${totalRefundAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Refund Requests"
        description="View and manage subscription refund requests"
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