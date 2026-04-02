import { Order } from "../types";
import { buildQuery, request } from "./http";

export const orderService = {
  getOrders(filters: { search?: string; status?: string }) {
    return request<Order[]>(`/orders${buildQuery(filters)}`);
  }
};
