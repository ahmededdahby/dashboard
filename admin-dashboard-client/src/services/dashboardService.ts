import { DashboardStats } from "../types";
import { request } from "./http";

export const dashboardService = {
  getStats() {
    return request<DashboardStats>("/dashboard/stats");
  }
};
