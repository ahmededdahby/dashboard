import { useEffect, useMemo, useState } from "react";
import { UserForm } from "../components/users/UserForm";
import { StatusBadge } from "../components/ui/StatusBadge";
import { userService } from "../services/userService";
import { User, UserPayload } from "../types";
import { formatDate } from "../utils/format";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await userService.getUsers({});
        setUsers(response);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load users.");
      } finally {
        setLoading(false);
      }
    }

    void loadUsers();
  }, []);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !role || user.role === role;
      const matchesStatus = !status || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [role, search, status, users]);

  async function handleSubmit(payload: UserPayload) {
    try {
      setError("");
      setSaving(true);

      await new Promise((resolve) => window.setTimeout(resolve, 800));

      if (selectedUser) {
        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  fullName: payload.fullName,
                  email: payload.email,
                  role: payload.role,
                  status: payload.status
                }
              : user
          )
        );
      } else {
        const newUser: User = {
          id: String(Date.now()),
          fullName: payload.fullName,
          email: payload.email,
          role: payload.role,
          status: payload.status,
          createdAt: new Date().toISOString()
        };

        setUsers((currentUsers) => [newUser, ...currentUsers]);
        setSuccessMessage("User created successfully");
      }

      setPanelOpen(false);
      setSelectedUser(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save user.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-stack">
      <div className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Team directory</p>
            <h2>Users</h2>
          </div>
          <button className="primary-button" onClick={() => { setSelectedUser(null); setPanelOpen(true); }}>
            Add user
          </button>
        </div>

        <div className="toolbar">
          <input placeholder="Search by name or email" value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Editor">Editor</option>
            <option value="Support">Support</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {successMessage ? <div className="success-banner">{successMessage}</div> : null}
        {error ? <div className="error-banner">{error}</div> : null}
        {loading ? <div className="page-message">Loading users...</div> : null}

        {!loading ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><StatusBadge value={user.status} /></td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <button className="table-action" onClick={() => { setSelectedUser(user); setPanelOpen(true); }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredUsers.length ? <div className="empty-state">No users match the current filters.</div> : null}
          </div>
        ) : null}
      </div>

      <UserForm
        open={panelOpen}
        user={selectedUser}
        saving={saving}
        onClose={() => { setPanelOpen(false); setSelectedUser(null); }}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
