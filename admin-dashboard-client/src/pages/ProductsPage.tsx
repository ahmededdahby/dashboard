import { useEffect, useState } from "react";
import { ProductForm } from "../components/products/ProductForm";
import { StatusBadge } from "../components/ui/StatusBadge";
import { productService } from "../services/productService";
import { Product, ProductPayload } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await productService.getProducts({ search, category, status });
        setProducts(response);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, [search, category, status]);

  async function handleSubmit(payload: ProductPayload) {
    try {
      setSaving(true);
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      const refreshed = await productService.getProducts({ search, category, status });
      setProducts(refreshed);
      setPanelOpen(false);
      setSelectedProduct(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-stack">
      <div className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalog management</p>
            <h2>Products</h2>
          </div>
          <button className="primary-button" onClick={() => { setSelectedProduct(null); setPanelOpen(true); }}>
            Add product
          </button>
        </div>

        <div className="toolbar">
          <input placeholder="Search by product or category" value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            <option value="Accessories">Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Displays">Displays</option>
            <option value="Workspace">Workspace</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {error ? <div className="error-banner">{error}</div> : null}
        {loading ? <div className="page-message">Loading products...</div> : null}

        {!loading ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{product.stock}</td>
                    <td><StatusBadge value={product.status} /></td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td>
                      <button className="table-action" onClick={() => { setSelectedProduct(product); setPanelOpen(true); }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!products.length ? <div className="empty-state">No products match the current filters.</div> : null}
          </div>
        ) : null}
      </div>

      <ProductForm
        open={panelOpen}
        product={selectedProduct}
        saving={saving}
        onClose={() => { setPanelOpen(false); setSelectedProduct(null); }}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
