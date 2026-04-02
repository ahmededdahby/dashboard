import { LoginRequest, LoginResponse } from "../types";
import { request } from "./http";

export const authService = {
  login(payload: LoginRequest) {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true
    });
  }
};
