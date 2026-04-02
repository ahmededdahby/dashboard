import { User, UserPayload } from "../types";
import { buildQuery, request } from "./http";

export const userService = {
  getUsers(filters: { search?: string; role?: string; status?: string }) {
    return request<User[]>(`/users${buildQuery(filters)}`);
  },
  createUser(payload: UserPayload) {
    return request<User>("/users", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateUser(id: string, payload: UserPayload) {
    return request<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }
};
