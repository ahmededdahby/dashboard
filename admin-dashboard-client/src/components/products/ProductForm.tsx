import { FormEvent, useEffect, useState } from "react";
import { Product, ProductPayload } from "../../types";

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: ProductPayload) => Promise<void>;
}

const emptyState: ProductPayload = {
  name: "",
  category: "Accessories",
  price: 0,
  stock: 0,
  status: "Active"
};

export function ProductForm({ open, product, saving, onClose, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState<ProductPayload>(emptyState);

  useEffect(() => {
    setForm(
      product
        ? {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            status: product.status
          }
        : emptyState
    );
  }, [product, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="panel-overlay">
      <div className="side-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Product form</p>
            <h3>{product ? "Edit product" : "Add product"}</h3>
          </div>
          <button className="ghost-button" onClick={onClose}>Close</button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Product name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>

          <label>
            Category
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
              <option>Accessories</option>
              <option>Audio</option>
              <option>Displays</option>
              <option>Workspace</option>
            </select>
          </label>

          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
              required
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
              required
            />
          </label>

          <label>
            Status
            <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Archived</option>
            </select>
          </label>

          <div className="panel-actions">
            <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Saving..." : product ? "Update product" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
