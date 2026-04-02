import { FormEvent, useEffect, useState } from "react";
import { User, UserPayload } from "../../types";

interface UserFormProps {
  open: boolean;
  user: User | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: UserPayload) => Promise<void>;
}

const emptyState: UserPayload = {
  fullName: "",
  email: "",
  role: "Admin",
  status: "Active"
};

export function UserForm({ open, user, saving, onClose, onSubmit }: UserFormProps) {
  const [form, setForm] = useState<UserPayload>(emptyState);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      user
        ? {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status
          }
        : emptyState
    );
    setError("");
  }, [user, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = form.fullName.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Name and email are required.");
      return;
    }

    setError("");
    await onSubmit({
      ...form,
      fullName: trimmedName,
      email: trimmedEmail
    });
  }

  if (!open) {
    return null;
  }

  return (
    <div className="panel-overlay">
      <div className="side-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">User form</p>
            <h3>{user ? "Edit user" : "Add user"}</h3>
          </div>
          <button className="ghost-button" onClick={onClose}>Close</button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          {error ? <div className="error-banner">{error}</div> : null}

          <label>
            Name
            <input
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
          </label>

          <label>
            Email
            <input
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>

          <label>
            Role
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Editor</option>
              <option>Support</option>
            </select>
          </label>

          <label>
            Status
            <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </label>

          <div className="panel-actions">
            <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
