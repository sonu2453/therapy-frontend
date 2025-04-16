import { Link, useLocation } from "react-router-dom";
import { UserIcon, CalenderIcon, ChatIcon, TherapistIcon } from "../icons";

export default function AppSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <UserIcon className="size-5" />,
    },
    {
      title: "Match Me",
      path: "/dashboard/match-me",
      icon: <TherapistIcon className="size-5" />,
    },
    {
      title: "Chat",
      path: "/dashboard/chat",
      icon: <ChatIcon className="size-5" />,
    },
    {
      title: "Calendar",
      path: "/dashboard/calendar",
      icon: <CalenderIcon className="size-5" />,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Therapy App
        </h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
