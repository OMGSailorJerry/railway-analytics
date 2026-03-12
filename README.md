# Railway Network Analytics Dashboard

A modern, real-time dashboard for Swiss railway network analytics built with React, TypeScript, and Swiss Open Transport Data.

## 🚀 Tech Stack

- **Core**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **State Management**:
  - TanStack Query v5 (server state)
  - Zustand (client/UI state)
- **Routing**: React Router v6
- **Mapping**: React Leaflet + Leaflet
- **Charts**: Recharts
- **Code Quality**: ESLint + Prettier + typescript-eslint

## 📁 Project Structure

```
src/
├── api/
│   ├── transport-api.ts          # API client for transport.opendata.ch
│   ├── types.ts                  # Domain and API types
│   └── mappers/
│       ├── station.mapper.ts     # Station mapping logic
│       ├── departure.mapper.ts   # Departure mapping logic
│       └── connection.mapper.ts  # Connection mapping logic
├── features/
│   ├── station-search/           # Station search autocomplete
│   ├── station-board/            # Departures display + KPIs
│   ├── connections/              # Connection planner
│   └── map/                      # Interactive railway map
├── store/
│   └── app.store.ts             # Zustand global state
├── shared/
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Custom React hooks
│   └── utils/                   # Utility functions
├── app/
│   └── layout/                  # Layout components
└── main.tsx                     # App entry point
```

## 🎯 Features

### ✅ Implemented
- **Station Search**: Real-time search with debouncing
- **Live Departures**: Auto-refreshing station board (60s interval)
- **KPI Dashboard**: On-time rate, next departure, avg delay
- **Interactive Map**: OpenStreetMap with station markers
- **Connection Planner**: Find routes between stations
- **Responsive Layout**: Three-column layout with map integration

### 📋 TODO
- Arrivals view
- Historical analytics
- Delay predictions
- Route visualization on map
- Filter and sort options
- Dark mode toggle

## 🚦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📊 Data Source

This dashboard uses the [transport.opendata.ch](https://transport.opendata.ch) API, which provides real-time Swiss public transport data.

**API Endpoints Used**:
- `/v1/locations` - Station search
- `/v1/stationboard` - Live departures/arrivals
- `/v1/connections` - Route planning

## 🏗️ Architecture Decisions

### State Management
- **TanStack Query**: All server data (stations, departures, connections) with automatic caching and refetching
- **Zustand**: UI state (selected station, map center/zoom, active tab)

### Type Safety
- Strict TypeScript configuration
- Separate types for raw API responses and domain models
- Mapper functions to transform API data to domain types

### Component Organization
- Feature-based folder structure
- Co-location of components with their hooks
- Shared components for reusability

### Error Handling
- All async functions have explicit error handling
- User-friendly error states with retry buttons
- Loading states for better UX

## 🎨 Styling

- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **CSS Variables**: Theme customization via HSL color system

## 🧪 Code Quality

```bash
# Lint
npm run lint

# Format (with Prettier)
npx prettier --write .
```

## 📝 License

MIT

## 👥 Contributing

Contributions are welcome! Please follow the existing code style and ensure all TypeScript types are properly defined.

