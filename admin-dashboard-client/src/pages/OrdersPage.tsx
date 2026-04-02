import { useEffect, useState } from "react";
import { StatusBadge } from "../components/ui/StatusBadge";
import { orderService } from "../services/orderService";
import { Order } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const response = await orderService.getOrders({ search, status });
        setOrders(response);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    }

    void loadOrders();
  }, [search, status]);

  return (
    <section className="page-stack">
      <div className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sales feed</p>
            <h2>Orders</h2>
          </div>
        </div>

        <div className="toolbar">
          <input placeholder="Search by customer" value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {error ? <div className="error-banner">{error}</div> : null}
        {loading ? <div className="page-message">Loading orders...</div> : null}

        {!loading ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id.slice(0, 8)}</td>
                    <td>
                      <strong>{order.customerName}</strong>
                      <div className="muted-text">{order.customerEmail}</div>
                    </td>
                    <td>{order.items.map((item) => `${item.quantity}x ${item.productName}`).join(", ")}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td><StatusBadge value={order.status} /></td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!orders.length ? <div className="empty-state">No orders match the current filters.</div> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
