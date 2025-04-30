import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Define your stripe publishable key here
const stripePromise = loadStripe("pk_test_51RIo39FVAQav3qMCYLE6nB5Le4LamV26zk1xqgvQ6mQ2QQtWaPqVM3SBSThif69E7VsNHD4E88yQdwxPIrRGPUpn00y6PWTohe");


const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null); // Track selected plan
  const [error, setError] = useState<string | null>(null); // General error state

  // Registration form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const getApiBaseUrl = () => {
    // Access the variable using import.meta.env
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  };
  const getCsrfToken = async () => {
    // Use relative path or configured base URL for CSRF cookie endpoint
    await axios.get(`${getApiBaseUrl()}/sanctum/csrf-cookie`, {
      withCredentials: true, // Ensure cookies are sent
    });
    console.log("CSRF token fetched successfully (or cookie set)");
  };

  const handleRegisterAndCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (!selectedPlan) {
      setError("Please select a subscription plan.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setRegistrationError(null);

    try {
      // 1. Get CSRF token first (important for stateful auth like Sanctum)
      await getCsrfToken();

      // 2. Attempt Registration
      try {
        await axios.post(`${getApiBaseUrl()}/api/register`, {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          // Add any other required registration fields (e.g., role_id if needed)
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
          },
          withCredentials: true, // Send cookies (important if backend sets auth cookie on register)
        });
        console.log("Registration successful");
        // If registration is successful, Laravel Sanctum should handle login via cookies

      } catch (regErr: any) {
        console.error("Registration failed", regErr.response?.data);
        const errorMsg = regErr.response?.data?.message || "Registration failed. Please check your details.";
        // Handle validation errors specifically if backend provides them
        if (regErr.response?.data?.errors) {
          const validationErrors = Object.values(regErr.response.data.errors).flat().join(' ');
           setRegistrationError(validationErrors);
        } else {
           setRegistrationError(errorMsg);
        }
        setLoading(false);
        return; // Stop if registration fails
      }

      // 3. Create Stripe Checkout Session (User should be authenticated now via cookie)
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const response = await axios.post(`${getApiBaseUrl()}/api/create-checkout-session`,
        { plan: selectedPlan }, // Send the selected plan
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          withCredentials: true, // Crucial for sending the auth cookie
        }
      );

      console.log("Checkout Session Response:", response.data);
      const sessionId = response.data?.id;

      if (!sessionId) {
         throw new Error("Could not retrieve checkout session ID.");
      }

      // 4. Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error("Stripe redirect error:", result.error.message);
        setError(result.error.message || "An unknown error occurred during Stripe redirect.");
      }
    } catch (err: any) {
      console.error("Error during registration or checkout", err);
      setError(err.response?.data?.error || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Register and Choose Your Plan
        </h1>

        <form onSubmit={handleRegisterAndCheckout} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Registration Fields */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Create Your Account</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>
           <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>
           {registrationError && (
              <p className="text-sm text-red-600">{registrationError}</p>
            )}

          {/* Plan Selection */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4 border-t border-gray-200">2. Select Your Plan</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Basic Plan */}
            <div 
              onClick={() => setSelectedPlan("basic")}
              className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-200 ${selectedPlan === 'basic' ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">Basic Plan</h3>
              <p className="mt-2 text-gray-700">$99.00<span className="text-sm text-gray-500">/month</span></p>
               <p className="mt-1 text-sm text-gray-500">(Includes 1-month free trial)</p>
               <p className="mt-1 text-sm text-gray-500">Connect with 5 Therapist</p>
               <p className="mt-1 text-sm text-gray-500">One on one chat with therapist</p>
               <p className="mt-1 text-sm text-gray-500">Video call with therapist</p>
               <p className="mt-1 text-sm text-gray-500">Group chat with therapist</p>
              {/* Add feature list if desired */}
            </div>

            {/* Advanced Plan */}
             <div 
               onClick={() => setSelectedPlan("advanced")}
               className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-200 ${selectedPlan === 'advanced' ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-gray-300 hover:border-gray-400'}`}
             >
               <h3 className="text-lg font-semibold text-gray-900">Advanced Plan</h3>
               <p className="mt-2 text-gray-700">$999.00<span className="text-sm text-gray-500">/month</span></p>
               <p className="mt-1 text-sm text-gray-500">(Includes 1-month free trial)</p>
               <p className="mt-1 text-sm text-gray-500">Connect with unlimited Therapist</p>
               <p className="mt-1 text-sm text-gray-500">One on one chat with therapist</p>
               <p className="mt-1 text-sm text-gray-500">Video call with therapist</p>
               <p className="mt-1 text-sm text-gray-500">Group chat with therapist</p>
               {/* Add feature list if desired */}
             </div>
          </div>
           {error && !registrationError && ( // Show general error only if no registration error
             <p className="text-sm text-red-600">{error}</p>
           )}

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || !selectedPlan} // Disable if loading or no plan selected
              className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                loading || !selectedPlan
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {loading ? "Processing..." : `Register & Subscribe to ${selectedPlan ? selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) : 'Plan'}`}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SubscriptionPage;