import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define an interface for the invoice data shape
interface Invoice {
  id: string;
  date: string;
  total: string; 
  status: string;
  receipt_url: string | null;
}

const getApiBaseUrl = () => {
  // Access the variable using import.meta.env
  return import.meta.env.VITE_API_URL || "http://localhost:8000";
};

const PaymentHistory: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Invoice[]>(`${apiBaseUrl}/api/payment-history`, {
          withCredentials: true, // Ensure authentication cookie is sent
          headers: {
            'Accept': 'application/json',
          },
        });
        setInvoices(response.data);
      } catch (err: any) {
        console.error("Error fetching payment history:", err);
        setError(err.response?.data?.error || "Could not fetch payment history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [apiBaseUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payment History</h1>

      {loading && (
        <div className="text-center text-gray-500">
          <p>Loading payment history...</p>
          {/* Optional: Add a spinner */}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && invoices.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No payment history found.</p>
        </div>
      )}

      {!loading && !error && invoices.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span 
                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ 
                         invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                         invoice.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 
                         'bg-red-100 text-red-800' // Default/failed status
                       }`}
                     >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)} {/* Capitalize status */}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {invoice.receipt_url ? (
                      <a 
                        href={invoice.receipt_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Receipt
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory; 