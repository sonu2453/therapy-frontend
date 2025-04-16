import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DataTable from "../../../components/ui/table/DataTable";
import { DollarLineIcon } from "../../../icons";

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
  status: "active" | "inactive";
  subscribers: number;
}

const plans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "Basic Plan",
    price: 29.99,
    duration: "Monthly",
    features: ["5 Sessions/month", "Basic Support", "Email Notifications"],
    status: "active",
    subscribers: 45,
  },
  {
    id: 2,
    name: "Professional Plan",
    price: 59.99,
    duration: "Monthly",
    features: ["15 Sessions/month", "Priority Support", "SMS Notifications", "Analytics"],
    status: "active",
    subscribers: 28,
  },
  {
    id: 3,
    name: "Enterprise Plan",
    price: 99.99,
    duration: "Monthly",
    features: ["Unlimited Sessions", "24/7 Support", "Custom Integrations", "Advanced Analytics"],
    status: "active",
    subscribers: 12,
  },
];

const columns = [
  {
    header: "Plan",
    accessor: (plan: SubscriptionPlan) => (
      <div className="flex items-center gap-3">
        <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {plan.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {plan.duration}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (plan: SubscriptionPlan) => (
      <div className="font-medium text-gray-900 dark:text-white">
        ${plan.price.toFixed(2)}
      </div>
    ),
  },
  {
    header: "Features",
    accessor: (plan: SubscriptionPlan) => (
      <ul className="list-disc pl-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
            {feature}
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Subscribers",
    accessor: (plan: SubscriptionPlan) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {plan.subscribers}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (plan: SubscriptionPlan) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          plan.status === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {plan.status}
      </span>
    ),
  },
];

export default function AllPlans() {
  return (
    <>
      <PageMeta
        title="Subscription Plans | Dashboard"
        description="Manage subscription plans"
      />
      <PageBreadcrumb pageTitle="All Plans" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Plans</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {plans.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <DollarLineIcon className="size-8 text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {plans.reduce((sum, plan) => sum + plan.subscribers, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Subscription Plans"
        description="Manage your subscription plans and pricing"
        columns={columns}
        data={plans}
        onRowClick={(plan) => {
          // Handle row click, e.g., navigate to plan details
          console.log("Clicked plan:", plan);
        }}
      />
    </>
  );
} 