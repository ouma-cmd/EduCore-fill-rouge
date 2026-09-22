import { NavLink, useNavigate } from "react-router";
import logo from "../../../assets/Educore.png";

function Sidebar() {
  const navegate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-5 py-6">
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <img
          src={logo}
          alt="EduCore logo"
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboardAdmin"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/User"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              User
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Students
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/teacher"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Teachers
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/parent"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Parent
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Classes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/subject"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Subject
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navegate("/login");
          }}
          className="w-full text-left px-4 py-5 text-M text-red-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
        >
          {" "}
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
