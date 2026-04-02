export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface TrendPoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  revenueChange: number;
  ordersChange: number;
  trend: TrendPoint[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface UserPayload {
  fullName: string;
  email: string;
  role: string;
  status: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  createdAt: string;
}

export interface ProductPayload {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  createdAt: string;
  total: number;
  items: OrderItem[];
}
