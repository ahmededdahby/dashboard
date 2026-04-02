# Admin Dashboard Portfolio Project

A clean full-stack admin dashboard built with React, TypeScript, Vite, and ASP.NET Core Web API.

## Features

### Frontend
- React + TypeScript + Vite
- Login, Dashboard, Users, Products, and Orders pages
- Responsive sidebar and topbar layout
- Dashboard stat cards and revenue/orders chart
- Search and filter tables for users, products, and orders
- Add/edit forms for users and products
- Fetch-based API service layer

### Backend
- ASP.NET Core Web API
- Endpoints for auth, dashboard stats, users, products, and orders
- Simple in-memory seeded data for demo use
- Clean folders for Controllers, Models, DTOs, Services, and Data
- CORS enabled for the frontend dev server

## Demo Login

- Email: `maya.carter@northstar.dev`
- Password: `Admin123!`

## Project Structure

- `AdminDashboard.Api` - ASP.NET Core backend
- `admin-dashboard-client` - React frontend

## Run the Backend

```bash
cd AdminDashboard.Api
dotnet run
```

The API runs on:
- `http://localhost:5157`
- Swagger/OpenAPI in development is exposed through the built-in OpenAPI route.

## Run the Frontend

```bash
cd admin-dashboard-client
npm install
npm run dev
```

The frontend runs on:
- `http://localhost:5173`

If you want a custom API base URL, create a `.env` file in `admin-dashboard-client` and add:

```bash
VITE_API_BASE_URL=http://localhost:5157/api
```

## Build Checks

```bash
cd AdminDashboard.Api
dotnet build -c Debug
```

```bash
cd admin-dashboard-client
npm run build
```

## Notes

- The backend uses seeded in-memory data to keep setup fast and portfolio-friendly.
- Authentication is intentionally simple and returns a demo token for the UI flow.
- Users and products support create/update actions against the in-memory store.
