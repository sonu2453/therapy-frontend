import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Welcome | Your App Name"
        description="Welcome to our application"
      />
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
            Welcome to Our Application
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Please sign in to access the dashboard
          </p>
          <Link
            to="/signin"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
} 