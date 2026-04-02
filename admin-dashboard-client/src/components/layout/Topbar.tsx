import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthUser } from "../../types";

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Track revenue, orders, and store activity." },
  "/users": { title: "Users", subtitle: "Manage team members and account access." },
  "/products": { title: "Products", subtitle: "Keep catalog details and stock up to date." },
  "/orders": { title: "Orders", subtitle: "Review the latest customer purchases." }
};

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useMemo(() => {
    const stored = localStorage.getItem("admin_user");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  }, []);

  const content = titleMap[location.pathname] ?? titleMap["/dashboard"];
  const initials = (user?.fullName ?? "Admin User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/login");
  }

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button className="menu-button" onClick={onMenuClick} aria-label="Open menu">
          Menu
        </button>
        <div>
          <p className="eyebrow">Admin workspace</p>
          <h1>{content.title}</h1>
          <span>{content.subtitle}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-user">
          <span className="topbar-avatar">{initials}</span>
          <div>
            <strong>{user?.fullName ?? "Admin User"}</strong>
            <span className="topbar-role">{user?.role ?? "Admin"}</span>
          </div>
        </div>
        <button className="ghost-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
