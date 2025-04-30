import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import PageMeta from "../../components/common/PageMeta";

// --- Header Component ---
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">[Your Company Name]</span>
              {/* Placeholder Logo - Replace with your actual logo */}
              <img 
                 className="h-8 w-auto sm:h-10" 
                 src="https://assets.betterhelp.com/brand/tmp/betterhelporg/icon-color-2024.png?v=0c97063a924d" // Adjust path to your logo
                 alt="Company Logo" 
               /> 
            </Link>
          </div>
          <div className="hidden ml-10 space-x-8 lg:block">
            <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">Home</Link>
            <Link to="/make-payment" className="text-base font-medium text-gray-500 hover:text-gray-900">Pricing</Link> {/* Assuming /pricing route */}
            <Link to="/make-payment" className="text-base font-medium text-gray-500 hover:text-gray-900">Contact Us</Link> {/* Assuming /contact route */}
            {/* Add other menu items here */}
          </div>
           <div className="hidden lg:block ml-auto">
             <Link 
               to="/signin" // Link to your Sign In page
               className="inline-block bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
             >
               Sign In
             </Link>
           </div>
           {/* Mobile menu button (placeholder) */}
            <div className="lg:hidden ml-auto">
                {/* Add button logic here to toggle mobile menu */}
                <button className="bg-gray-100 p-2 rounded-md text-gray-500">
                    <span className="sr-only">Open menu</span>
                     {/* Placeholder for Menu Icon */}
                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>
            </div>
        </div>
        {/* Mobile menu dropdown (placeholder) - needs state management */}
        {/* <div className="lg:hidden border-t border-gray-200 py-4">
             <div className="flex flex-col space-y-4 px-2">
                <Link to="/" className="block text-base font-medium text-gray-500 hover:text-gray-900">Home</Link>
                <Link to="/pricing" className="block text-base font-medium text-gray-500 hover:text-gray-900">Pricing</Link>
                <Link to="/contact" className="block text-base font-medium text-gray-500 hover:text-gray-900">Contact Us</Link>
                <Link to="/signin" className="block text-base font-medium text-gray-500 hover:text-gray-900">Sign In</Link>
             </div>
           </div> */}
      </nav>
    </header>
  );
};

// Placeholder components for icons (replace with actual icons or library like react-icons)
const LockClosedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>; // Using check for quality
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.418a.563.563 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988H8.88a.563.563 0 0 0 .475-.31L11.48 3.5Z" /></svg>;

const HomePage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Welcome | Your App Name"
        description="Welcome to our application"
      />
      {/* Add Header */}
      <Header />
      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 sm:py-28 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Unlock Your Potential with Our Service
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Experience the best platform designed to help you achieve your goals, improve productivity, and enhance overall well-being. Join thousands of satisfied users today.
            </p>
            <Link
              to="/make-payment" // Link to your subscription/registration page
              className="inline-block bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-lg"
            >
              Get Started Today
            </Link>
          </div>
        </section>

        {/* Features/Benefits Section */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">A Proven Approach That Works</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Since [Your Start Year], we've supported millions by providing high-quality, evidence-based solutions for those seeking improvement and growth.
            </p>
            {/* Add specific feature cards here if desired */}
            {/* Example Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <div className="bg-white p-6 rounded-lg shadow">
                   <h3 className="text-xl font-semibold mb-2">Feature One</h3>
                   <p className="text-gray-600">Description of the first key feature or benefit of your service.</p>
               </div>
                <div className="bg-white p-6 rounded-lg shadow">
                   <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
                   <p className="text-gray-600">Description of the second key feature or benefit.</p>
               </div>
                <div className="bg-white p-6 rounded-lg shadow">
                   <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
                   <p className="text-gray-600">Description of the third key feature or benefit provided.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Trust/Security Section */}
        <section className="bg-gray-100 py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">Setting the Standard for Excellence</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              As a leader in our field, we proudly provide quality results. It is our goal to ensure total privacy, unparalleled security, and the highest-quality experience for our members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6">
                 <LockClosedIcon />
                <h3 className="text-xl font-semibold mt-4 mb-2">Privacy</h3>
                <p className="text-gray-600">Our platform is secured with robust encryption and privacy measures.</p>
              </div>
              <div className="flex flex-col items-center p-6">
                <ShieldCheckIcon />
                <h3 className="text-xl font-semibold mt-4 mb-2">Security</h3>
                <p className="text-gray-600">We adhere to high security standards to protect your data.</p>
              </div>
              <div className="flex flex-col items-center p-6">
                 <StarIcon />
                <h3 className="text-xl font-semibold mt-4 mb-2">Quality</h3>
                <p className="text-gray-600">Built on state-of-the-art technology and infrastructure.</p>
              </div>
            </div>
             <div className="mt-12">
               <Link
                 to="/make-payment" // Link to your subscription/registration page
                 className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 text-lg"
               >
                 Request a Demo / Learn More {/* Adjust CTA text */}
               </Link>
             </div>
          </div>
        </section>

         {/* Testimonials Section - Placeholder */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">What Our Users Say</h2>
             {/* Add a carousel or grid of testimonials here */}
             <div className="italic text-gray-600">
               <p className="mb-4">"This service has significantly changed my approach... Highly recommended!" - Happy User</p>
               <p>"Incredible platform, easy to use and very effective." - Another Satisfied Member</p>
               {/* Add more static testimonials or implement a dynamic component */}
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
            {/* Add footer links if needed */}
            {/* <nav className="mt-4 space-x-4">
               <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
               <Link to="/terms" className="hover:text-white">Terms of Service</Link>
             </nav> */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage; 