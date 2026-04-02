import { Product, ProductPayload } from "../types";
import { buildQuery, request } from "./http";

export const productService = {
  getProducts(filters: { search?: string; category?: string; status?: string }) {
    return request<Product[]>(`/products${buildQuery(filters)}`);
  },
  createProduct(payload: ProductPayload) {
    return request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateProduct(id: string, payload: ProductPayload) {
    return request<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }
};
