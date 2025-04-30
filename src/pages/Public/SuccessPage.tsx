import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
// Assuming you have an auth context or state management for user data
// import { useAuth } from './AuthContext'; 

// SVG Checkmark Icon Component (or import from a library)
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


const SubscriptionSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null); // Or a specific user type
  // const { login } = useAuth(); // Example function from auth context

  const getApiBaseUrl = () => {
    // Access the variable using import.meta.env
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  };
  useEffect(() => {
    const verifyUserSession = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Attempt to fetch the authenticated user data
        const response = await axios.get(`${getApiBaseUrl()}/api/user`, {
          withCredentials: true, // Crucial: sends the session cookie
          headers: {
             'Accept': 'application/json', 
          }
        });
        
        // If successful, the user is logged in
        console.log("User session verified:", response.data);
        setUserData(response.data); 
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update your global auth state here, e.g.:
        // login(response.data); 

      } catch (err: any) {
        console.error("Failed to verify user session:", err.response?.status, err.response?.data);
        // If 401 or other error, session likely didn't persist
        setError("Your session could not be verified. Please try logging in.");
         // Optionally, clear any local auth state:
         // logout(); 
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, []); // Removed dependencies like 'login' if they cause infinite loops without useCallback

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Verifying your session...</h2>
            {/* Optional: Add a spinner here */}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
          <div>
            {/* Error Icon (optional) */}
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-6 text-2xl font-bold text-red-700">Verification Failed</h2>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
             <Link
               to="/login" // Link to login page if verification fails
               className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
               Go to Login
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div>
          <CheckIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Subscription Successful!</h1>
          <p className="mt-2 text-base text-gray-600">
            Thank you for subscribing, <span className="font-semibold">{userData?.name || 'User'}</span>!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Your free trial has started. You can now access your dashboard.
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard" // Adjust if your dashboard route is different
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;