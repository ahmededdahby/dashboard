import { TrendPoint } from "../../types";
import { formatCurrency } from "../../utils/format";

interface RevenueOrdersChartProps {
  data: TrendPoint[];
}

export function RevenueOrdersChart({ data }: RevenueOrdersChartProps) {
  const width = 640;
  const height = 280;
  const padding = 32;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxRevenue = Math.max(...data.map((point) => point.revenue), 1);
  const maxOrders = Math.max(...data.map((point) => point.orders), 1);

  const bars = data.map((point, index) => {
    const x = padding + index * (chartWidth / data.length) + 14;
    const barWidth = 34;
    const barHeight = (point.orders / maxOrders) * (chartHeight * 0.55);
    const y = height - padding - barHeight;

    return { ...point, x, y, barWidth, barHeight };
  });

  const linePoints = data.map((point, index) => {
    const x = padding + index * (chartWidth / Math.max(data.length - 1, 1));
    const y = height - padding - (point.revenue / maxRevenue) * chartHeight;
    return { x, y, point };
  });

  const linePath = linePoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="chart-card">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Performance trend</p>
          <h3>Revenue vs orders</h3>
        </div>
        <div className="chart-legend">
          <span><i className="legend-dot revenue" /> Revenue</span>
          <span><i className="legend-dot orders" /> Orders</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" role="img" aria-label="Revenue and orders trend">
        <defs>
          <linearGradient id="chartLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7a59" />
            <stop offset="100%" stopColor="#00b3a4" />
          </linearGradient>
          <linearGradient id="chartBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 122, 89, 0.75)" />
            <stop offset="100%" stopColor="rgba(255, 122, 89, 0.15)" />
          </linearGradient>
        </defs>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="chart-axis" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} className="chart-axis subtle" />

        {bars.map((bar) => (
          <g key={`bar-${bar.label}`}>
            <rect x={bar.x} y={bar.y} width={bar.barWidth} height={bar.barHeight} rx="10" className="chart-bar" />
            <text x={bar.x + bar.barWidth / 2} y={height - 8} textAnchor="middle" className="chart-label">
              {bar.label}
            </text>
          </g>
        ))}

        <path d={linePath} fill="none" className="chart-line" />
        {linePoints.map(({ x, y, point }) => (
          <g key={`point-${point.label}`}>
            <circle cx={x} cy={y} r="5" className="chart-point" />
            <text x={x} y={y - 14} textAnchor="middle" className="chart-value">
              {formatCurrency(point.revenue)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
