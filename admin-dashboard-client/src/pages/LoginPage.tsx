import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("maya.carter@northstar.dev");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("admin_token", response.token);
      localStorage.setItem("admin_user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-copy">
          <span className="eyebrow">Northstar Admin</span>
          <h1>Modern admin UX with a brighter, more confident visual rhythm.</h1>
          <p>
            A full-stack dashboard that feels polished instead of generic, with a cleaner control center,
            smoother visual hierarchy, and seeded data that makes the product feel alive right away.
          </p>
          <div className="login-badges">
            <span>React + TypeScript</span>
            <span>ASP.NET Core API</span>
            <span>Responsive admin UI</span>
          </div>
          <div className="login-tip">
            <strong>Demo credentials</strong>
            <span>Email: maya.carter@northstar.dev</span>
            <span>Password: Admin123!</span>
          </div>
        </div>

        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to continue</h2>
          </div>

          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          {error ? <div className="error-banner">{error}</div> : null}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
