import { useEffect, useState } from "react";
import { RevenueOrdersChart } from "../components/ui/RevenueOrdersChart";
import { StatCard } from "../components/ui/StatCard";
import { dashboardService } from "../services/dashboardService";
import { DashboardStats } from "../types";
import { formatCurrency, formatPercent } from "../utils/format";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const response = await dashboardService.getStats();
        setStats(response);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    void loadStats();
  }, []);

  if (loading) {
    return <div className="page-message">Loading dashboard...</div>;
  }

  if (error || !stats) {
    return <div className="page-message error-banner">{error || "Dashboard data is unavailable."}</div>;
  }

  const averageOrderValue = stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0;
  const bestMonth = [...stats.trend].sort((left, right) => right.revenue - left.revenue)[0];

  return (
    <section className="page-stack">
      <div className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Control center</span>
          <h2>Store performance is moving in the right direction.</h2>
          <p>
            Revenue is trending upward, orders remain healthy, and your team has a clean place to manage
            people, catalog updates, and sales activity.
          </p>
          <div className="hero-actions">
            <span className="hero-chip">Best month: {bestMonth?.label ?? "N/A"}</span>
            <span className="hero-chip hero-chip-soft">{stats.pendingOrders} orders need attention</span>
          </div>
        </div>

        <div className="hero-metrics">
          <div>
            <span>Average order</span>
            <strong>{formatCurrency(averageOrderValue)}</strong>
          </div>
          <div>
            <span>Revenue change</span>
            <strong>{formatPercent(stats.revenueChange)}</strong>
          </div>
          <div>
            <span>Orders change</span>
            <strong>{formatPercent(stats.ordersChange)}</strong>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={formatPercent(stats.revenueChange)}
          hint="Compared with last month"
          tone="teal"
          accent="Growth"
        />
        <StatCard
          label="Orders"
          value={stats.totalOrders.toString()}
          change={formatPercent(stats.ordersChange)}
          hint="All seeded demo orders"
          tone="amber"
          accent="Sales"
        />
        <StatCard
          label="Users"
          value={stats.totalUsers.toString()}
          hint="Team members in the admin area"
          tone="blue"
          accent="Team"
        />
        <StatCard
          label="Products"
          value={stats.totalProducts.toString()}
          hint="Active catalog records"
          tone="rose"
          accent="Catalog"
        />
      </div>

      <div className="dashboard-grid">
        <RevenueOrdersChart data={stats.trend} />

        <div className="info-card highlight-list">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Quick highlights</p>
              <h3>Store health</h3>
            </div>
          </div>

          <div className="highlight-item">
            <span>Pending orders</span>
            <strong>{stats.pendingOrders}</strong>
          </div>
          <div className="highlight-item">
            <span>Average order value</span>
            <strong>{formatCurrency(averageOrderValue)}</strong>
          </div>
          <div className="highlight-item">
            <span>Revenue trend range</span>
            <strong>{stats.trend.length} months</strong>
          </div>
          <div className="highlight-item">
            <span>Top performing month</span>
            <strong>{bestMonth?.label ?? "N/A"}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
