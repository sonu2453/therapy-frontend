import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "../../icons";

interface MenuItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  subItems?: {
    name: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <UserIcon className="size-5" />,
    subItems: [
      { name: "All Users", path: "/dashboard/users" },
      { name: "Therapists", path: "/dashboard/therapists" },
      { name: "Support Staff", path: "/dashboard/support-staff" },
    ],
  },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4 dark:border-gray-800">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div> */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <div className="flex flex-col">
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    location.pathname.startsWith(item.path)
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
                {item.subItems && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={`block rounded-lg px-3 py-2 text-sm ${
                            location.pathname === subItem.path
                              ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 