import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" }
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">N</span>
          <div>
            <strong>Northstar Admin</strong>
            <p>Freelance portfolio demo</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="eyebrow">Portfolio demo</span>
          <p>Northstar Admin</p>
        </div>
      </aside>
      {open ? <button className="sidebar-backdrop" onClick={onClose} aria-label="Close menu" /> : null}
    </>
  );
}
