import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { DollarLineIcon } from "../../../icons";

interface Payment {
  id: number;
  customerName: string;
  planName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
}

const payments: Payment[] = [
  {
    id: 1,
    customerName: "John Doe",
    planName: "Professional Plan",
    amount: 59.99,
    date: "2024-03-15",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    planName: "Basic Plan",
    amount: 29.99,
    date: "2024-03-14",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    planName: "Enterprise Plan",
    amount: 99.99,
    date: "2024-03-13",
    status: "failed",
    paymentMethod: "Credit Card",
  },
];

const columns = [
  {
    header: "Customer",
    accessor: (payment: Payment) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {payment.customerName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {payment.planName}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (payment: Payment) => (
      <div className="font-medium text-gray-900 dark:text-white">
        ${payment.amount.toFixed(2)}
      </div>
    ),
  },
  {
    header: "Date",
    accessor: (payment: Payment) => payment.date,
  },
  {
    header: "Payment Method",
    accessor: (payment: Payment) => payment.paymentMethod,
  },
  {
    header: "Status",
    accessor: (payment: Payment) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          payment.status === "completed"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : payment.status === "failed"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        }`}
      >
        {payment.status}
      </span>
    ),
  },
];

export default function PaymentHistory() {
  return (
    <>
      <PageMeta
        title="Payment History | Dashboard"
        description="View subscription payment history"
      />
      <PageBreadcrumb pageTitle="Payment History" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed Payments</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {payments.filter(p => p.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Payment History"
        description="View and manage subscription payments"
        columns={columns}
        data={payments}
        onRowClick={(payment) => {
          // Handle row click, e.g., navigate to payment details
          console.log("Clicked payment:", payment);
        }}
      />
    </>
  );
} 