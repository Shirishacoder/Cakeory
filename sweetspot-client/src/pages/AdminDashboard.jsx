import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const navItems = [
    { id: "orders", label: "Orders", path: "/admin/dashboard/orders" },
    { id: "customization", label: "Customization Orders", path: "/admin/dashboard/customization" },
    { id: "feedback", label: "Customer Feedback", path: "/admin/dashboard/feedback" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Navbar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`block px-6 py-3 text-gray-700 hover:bg-gray-200 transition duration-200 ${
                    activeSection === item.id ? "bg-gray-200 border-r-4 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
