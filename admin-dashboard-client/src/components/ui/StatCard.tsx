interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  hint: string;
  tone?: "teal" | "amber" | "blue" | "rose";
  accent?: string;
}

export function StatCard({ label, value, change, hint, tone = "blue", accent }: StatCardProps) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-head">
        <span className="eyebrow">{label}</span>
        {accent ? <span className="stat-accent">{accent}</span> : null}
      </div>
      <strong>{value}</strong>
      <div className="stat-card-foot">
        {change ? <span className="stat-change">{change}</span> : null}
        <p>{hint}</p>
      </div>
    </article>
  );
}
