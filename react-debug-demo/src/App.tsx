import { memo, useRef, useState } from "react";

type DemoMode = "before" | "after";

type UserRecord = {
  id: number;
  name: string;
  role: string;
};

function fakeFetchUsers() {
  return new Promise<UserRecord[]>((resolve, reject) => {
    window.setTimeout(() => {
      const shouldFail = Math.random() < 0.35;

      if (shouldFail) {
        reject(new Error("The server returned an unexpected error."));
        return;
      }

      resolve([
        { id: 1, name: "Maya Carter", role: "Admin" },
        { id: 2, name: "Omar Benali", role: "Manager" },
        { id: 3, name: "Sofia Nguyen", role: "Editor" }
      ]);
    }, 1000);
  });
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{description}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function BuggyForm() {
  const [name, setName] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label">Bug</p>
        <ul className="issue-list">
          <li>Empty submit is allowed</li>
          <li>No field guidance</li>
          <li>User gets no useful feedback</li>
        </ul>
      </div>

      <form
        className="demo-panel"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedValue(name);
        }}
      >
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Type anything or nothing" />
        </label>
        <button type="submit" className="primary-button">Submit</button>
        <div className="result-box">
          <strong>Submitted value:</strong>
          <span>{submittedValue || "(empty submit happened)"}</span>
        </div>
      </form>
    </div>
  );
}

function FixedForm() {
  const [form, setForm] = useState({ name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = form.name.trim();

    if (!trimmedName) {
      setError("Name is required.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess(`Submitted: ${trimmedName}`);
    setForm({ name: "" });
  }

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label success">Fix</p>
        <ul className="issue-list">
          <li>Required field validation</li>
          <li>Clear inline error message</li>
          <li>Cannot submit an empty form</li>
        </ul>
      </div>

      <form className="demo-panel" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(event) => {
              setForm({ name: event.target.value });
              if (error) {
                setError("");
              }
            }}
            placeholder="Enter a valid name"
          />
        </label>
        {error ? <div className="error-banner">{error}</div> : null}
        {success ? <div className="success-banner">{success}</div> : null}
        <button type="submit" className="primary-button">Submit</button>
        <p className="helper-copy">Try clicking submit without typing anything first.</p>
      </form>
    </div>
  );
}

function BuggyDataFetch() {
  const [users, setUsers] = useState<UserRecord[]>([]);

  async function loadUsers() {
    const response = await fakeFetchUsers();
    setUsers(response);
  }

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label">Bug</p>
        <ul className="issue-list">
          <li>No loading state</li>
          <li>No error handling</li>
          <li>Feels broken while waiting</li>
        </ul>
      </div>

      <div className="demo-panel">
        <button className="primary-button" onClick={() => void loadUsers()}>
          Load team
        </button>
        <ul className="list-box">
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FixedDataFetch() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");
      const response = await fakeFetchUsers();
      setUsers(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown request failure.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label success">Fix</p>
        <ul className="issue-list">
          <li>Loading spinner added</li>
          <li>Clear error state</li>
          <li>API call is easier to debug</li>
        </ul>
      </div>

      <div className="demo-panel">
        <button className="primary-button" onClick={() => void loadUsers()} disabled={loading}>
          {loading ? (
            <span className="loading-inline">
              <span className="spinner" aria-hidden="true" />
              Loading...
            </span>
          ) : (
            "Load team"
          )}
        </button>
        {error ? <div className="error-banner">{error}</div> : null}
        <ul className="list-box">
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.role}</li>
          ))}
          {!users.length && !loading && !error ? <li>No data loaded yet.</li> : null}
        </ul>
      </div>
    </div>
  );
}

function RenderCounter({ label }: { label: string }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="render-count">
      <strong>{label}</strong>
      <span>{renderCount.current} renders</span>
    </div>
  );
}

function BuggyPreview({ text }: { text: string }) {
  return (
    <div className="demo-panel">
      <RenderCounter label="Preview panel" />
      <p>Every keystroke re-renders this panel even though it only cares about the final filter text.</p>
      <div className="result-box">Current filter: {text || "Nothing typed yet"}</div>
    </div>
  );
}

const StablePreview = memo(function StablePreview({ filterText }: { filterText: string }) {
  return (
    <div className="demo-panel">
      <RenderCounter label="Preview panel" />
      <p>This panel only re-renders when the filter text changes, not when unrelated state changes.</p>
      <div className="result-box">Current filter: {filterText || "Nothing typed yet"}</div>
    </div>
  );
});

function BuggyStateExample() {
  const [state, setState] = useState({ filterText: "", notes: "" });

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label">Bug</p>
        <ul className="issue-list">
          <li>Unrelated state lives together</li>
          <li>Preview re-renders on every notes update</li>
          <li>Harder to reason about updates</li>
        </ul>
      </div>

      <div className="stack">
        <div className="demo-panel">
          <label>
            Filter text
            <input
              value={state.filterText}
              onChange={(event) => setState({ ...state, filterText: event.target.value })}
              placeholder="Type to filter"
            />
          </label>
          <label>
            Notes
            <textarea
              value={state.notes}
              onChange={(event) => setState({ ...state, notes: event.target.value })}
              placeholder="Typing here also re-renders the preview"
            />
          </label>
        </div>
        <BuggyPreview text={state.filterText} />
      </div>
    </div>
  );
}

function FixedStateExample() {
  const [filterText, setFilterText] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <p className="demo-label success">Fix</p>
        <ul className="issue-list">
          <li>State is split by responsibility</li>
          <li>Preview only receives the data it needs</li>
          <li>Fewer unnecessary re-renders with render count shown</li>
        </ul>
      </div>

      <div className="stack">
        <div className="demo-panel">
          <label>
            Filter text
            <input value={filterText} onChange={(event) => setFilterText(event.target.value)} placeholder="Type to filter" />
          </label>
          <label>
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Typing here should not rerender the preview"
            />
          </label>
        </div>
        <StablePreview filterText={filterText} />
      </div>
    </div>
  );
}

function BeforeExamples() {
  return (
    <div className="stack large-gap">
      <SectionCard title="Form issue" description="Buggy form allows empty submission and gives weak feedback.">
        <BuggyForm />
      </SectionCard>

      <SectionCard title="Data fetching issue" description="Buggy API call gives no clue what is happening during a request.">
        <BuggyDataFetch />
      </SectionCard>

      <SectionCard title="State issue" description="Buggy state shape causes unnecessary re-renders.">
        <BuggyStateExample />
      </SectionCard>
    </div>
  );
}

function AfterExamples() {
  return (
    <div className="stack large-gap">
      <SectionCard title="Form fix" description="Validation and error messages make the form usable.">
        <FixedForm />
      </SectionCard>

      <SectionCard title="Data fetching fix" description="Loading and error states make the request flow clear.">
        <FixedDataFetch />
      </SectionCard>

      <SectionCard title="State fix" description="Separating state and memoizing the preview avoids wasted renders.">
        <FixedStateExample />
      </SectionCard>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<DemoMode>("before");

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React debugging demo</p>
          <h1>React Bug Fix & Performance Improvement Demo</h1>
          <p className="hero-copy">
            This small project shows how a developer can spot UX bugs, clean up async handling,
            and reduce unnecessary re-renders in a practical admin-style interface.
          </p>
        </div>

        <div className="toggle-group" role="tablist" aria-label="Demo mode">
          <button
            className={mode === "before" ? "toggle-button active" : "toggle-button"}
            onClick={() => setMode("before")}
          >
            Before
          </button>
          <button
            className={mode === "after" ? "toggle-button active" : "toggle-button"}
            onClick={() => setMode("after")}
          >
            After
          </button>
        </div>
      </header>

      <section className="summary-card">
        <p className="eyebrow">What I fixed</p>
        <p className="summary-copy">
          This project demonstrates how I identify and fix common issues in React applications, including:
        </p>
        <ul className="summary-list">
          <li>form validation and UX issues</li>
          <li>API loading and error handling</li>
          <li>unnecessary re-renders and state optimization</li>
        </ul>
        <p className="summary-note">
          It reflects real-world scenarios I solve in freelance projects.
        </p>
      </section>

      {mode === "before" ? <BeforeExamples /> : <AfterExamples />}
    </div>
  );
}
