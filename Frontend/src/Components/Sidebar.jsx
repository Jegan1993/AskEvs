import { NavLink, useNavigate } from "react-router-dom";

import { LayoutDashboard, Users, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
    },
  ];

  return (
    <aside
      className="
            fixed
            left-0
            top-0
            z-40
            h-screen
            w-64
            bg-slate-900
            text-white
        "
    >
      {/* Logo */}

      <div
        className="
                flex
                h-16
                items-center
                border-b
                border-slate-700
                px-6
            "
      >
        <h1
          className="
                    text-xl
                    font-bold
                "
        >
          Employee Management
        </h1>
      </div>

      {/* Menu */}

      <nav
        className="
                mt-6
                px-3
            "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                                    mb-2
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-4
                                    py-3
                                    transition
                                    ${
                                      isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-300 hover:bg-slate-800"
                                    }
                                `}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div
        className="
                absolute
                bottom-5
                w-full
                px-3
            "
      >
        <button
          onClick={handleLogout}
          className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        px-4
                        py-3
                        text-slate-300
                        transition
                        hover:bg-red-600
                        hover:text-white
                    "
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
