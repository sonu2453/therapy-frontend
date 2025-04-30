import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable, { Column } from "../../components/ui/table/DataTable";
import { UserCircleIcon } from "../../icons";
import { Modal } from "../../components/ui/modal/index"; // Assuming you have a Modal component
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role_name: string;
  status: "active" | "inactive";
  created_at: string;
}

const columns: Column<User>[] = [
  {
    header: "User",
    accessor: (user: User) => (
      <div className="flex items-center gap-3">
        <UserCircleIcon className="size-8" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: "role_name",
  },
  {
    header: "Status",
    accessor: (user: User) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          user.status === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    header: "Created At",
    accessor: "created_at",
  },
];

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_name: "",
    status: "active", // default
  });

  // Pagination and Filtering States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [currentPage, searchTerm]);
  const getApiBaseUrl = () => {
    // Access the variable using import.meta.env
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  };
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await axios.get(`${getApiBaseUrl()}/api/users`, {
        params: {
          page: currentPage,
          per_page: 10,
          search: searchTerm,
        },
      });
      console.log(res.data, "usersData")
      const usersData = res.data.data || res.data; // Adjust based on your API response
      setUsers(usersData); // Assuming `data` contains the user list
      setTotalPages(usersData.last_page); // Assuming `last_page` contains total pages
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${getApiBaseUrl()}/api/roles`);
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(`${getApiBaseUrl()}/api/users`, formData);
      console.log("User created:", response.data);
      setIsModalOpen(false);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <>
      <PageMeta title="Users | Dashboard" description="Manage your users" />
      <PageBreadcrumb pageTitle="Users" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Users</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Create User
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
      <DataTable
        title="Users"
        description="Manage your users and their permissions"
        columns={columns}
        data={loading ? [] : users} // Pass an empty array if loading
        onRowClick={(user) => {
          console.log("Clicked user:", user);
        }}
      />
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isFullscreen={false}
          className="max-w-md w-full"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateUser();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role_name"
                value={formData.role_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}