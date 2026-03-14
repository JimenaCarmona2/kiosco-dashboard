# Kiosco Dashboard

A modern analytics dashboard for kiosks, built with Next.js, React, Tailwind CSS, and Firebase. The dashboard provides real-time and historical metrics, conversion funnels, and executive KPIs for kiosk performance monitoring.

## Features

- **Overview Dashboard**: Visualize key metrics such as traffic, engagement, session duration, and conversion rates.
- **Conversion Funnel**: Track user journey from presence detection to registration.
- **Daily Trends**: Analyze daily activity with interactive charts.
- **No Session Rate**: Monitor hourly rates of users who do not interact beyond 10 seconds.
- **Executive KPIs**: Quick summary for C-level insights.
- **Firebase Integration**: KPIs are dynamically loaded from Firestore.
- **Responsive UI**: Built with Tailwind CSS and custom UI components.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase (Firestore)](https://firebase.google.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/JimenaCarmona2/kiosco-dashboard.git
   cd kiosco-dashboard
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Copy your Firebase config to `lib/firebase.ts`.
   - Ensure Firestore rules allow the required reads.

4. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

- `app/` — Next.js app directory (routes, pages, layouts)
- `components/` — Reusable UI components
- `hooks/` — Custom React hooks
- `lib/` — Utility functions and Firebase config
- `public/` — Static assets
- `styles/` — Global styles

## Customization
- **KPIs**: Modify Firestore collection `kpis` to change dashboard metrics.
- **Funnel Steps**: Edit `funnelSteps` in `app/page.tsx` for custom funnel stages.
- **Charts**: Update chart data or connect to live sources as needed.

## License

This project is licensed under the MIT License.

---

Made by
- Jimena García Carmona
- Ximena Castañeda Cañedo
- María Fernanda Cárdenas Hernández
