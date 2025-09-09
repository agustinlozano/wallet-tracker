# Personal Investment Portfolio Tracker & Historical Analyzer

A modern web application for tracking and analyzing personal investment portfolio data from AlyC brokerage. Built with Next.js, React, TypeScript, TailwindCSS, and Shadcn/ui components.

## 🚀 Features Implemented

### ✅ Feature 1: Daily Data Ingestion

- **JSON Data Structure**: Portfolio data is stored in `/data/sample-portfolio-data.json`
- **API Endpoint**: `/api/portfolio-data` serves the JSON data
- **Type Safety**: Comprehensive TypeScript interfaces in `/types/basis.ts`
- **Data Structure includes**:
  - Portfolio Summary (ARS/USD total value and 30-day returns)
  - Account Balances (across different settlement terms)
  - Investment Holdings (detailed breakdown by asset type)
  - Cash Flow projections (securities, schedule, and currency summaries)

### ✅ Feature 2: Daily View Dashboard

- **Portfolio Summary Cards**: Display total value in ARS and USD with 30-day performance
- **Asset Allocation Chart**: Interactive pie chart showing distribution by asset type (Equities, Bonds, CEDEARS, Notes)
- **Account Balances Table**: Complete breakdown of available funds by settlement terms
- **Investment Holdings Table**: Detailed view of all positions with real-time performance metrics
- **Cash Flow Overview**: Summary of expected payments and upcoming cash flows
- **Responsive Design**: Fully responsive layout that works on all devices

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with custom design tokens
- **UI Components**: Shadcn/ui component library
- **Charts**: Recharts with custom chart components
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd alyc
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/portfolio-data/route.ts    # API endpoint for portfolio data
│   ├── globals.css                    # Global styles and design tokens
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Main dashboard page
├── components/
│   ├── ui/                           # Shadcn/ui base components
│   ├── account-balances-card.tsx     # Account balances display
│   ├── asset-allocation-chart.tsx    # Pie chart for asset allocation
│   ├── cash-flow-overview.tsx       # Cash flow summary and upcoming payments
│   ├── holdings-table.tsx           # Detailed holdings table
│   └── portfolio-summary-card.tsx   # Portfolio value summary cards
├── data/
│   └── sample-portfolio-data.json   # Portfolio data storage
├── lib/
│   ├── portfolio-utils.ts           # Utility functions for data handling
│   └── utils.ts                     # General utility functions
└── types/
    └── basis.ts                     # TypeScript interfaces and types
```

## 📊 Data Structure

The application expects daily portfolio snapshots in the following format:

```typescript
interface DailyPortfolioSnapshot {
  date: string;
  portfolioSummaryTable: PortfolioSummaryTable;
  accountBalancesTable: AccountBalancesTable;
  investmentHoldingsTable: InvestmentHoldingsTable;
  securityCashFlowTable: SecurityCashFlowTable;
  currencyCashFlowTable: CurrencyCashFlowTable;
  cashFlowScheduleTable: CashFlowScheduleTable;
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with consistent spacing and typography
- **Dark/Light Mode**: Supports both light and dark themes
- **Color-coded Performance**: Green/red indicators for positive/negative returns
- **Interactive Charts**: Hover tooltips and responsive chart elements
- **Responsive Tables**: Horizontal scrolling on mobile devices
- **Loading States**: Proper loading and error handling

## 🔄 Data Updates

To update portfolio data:

1. **Replace the JSON file**: Update `/data/sample-portfolio-data.json` with new data
2. **Refresh Dashboard**: Click the "Refresh" button or reload the page
3. **Automatic Loading**: The app automatically loads the most recent snapshot

## 🚀 Next Steps (Features 3 & 4)

The foundation is now set for implementing:

- **Feature 3**: Historical Analysis & Time Series Charts

  - Portfolio value trends over time
  - Individual asset performance tracking
  - Historical comparisons

- **Feature 4**: Data Comparison
  - Side-by-side snapshot comparisons
  - Change detection and highlighting
  - Historical diff views

## 📝 Development Notes

- All currency parsing handles both ARS and USD formats
- Percentage calculations include proper color coding
- Components are modular and reusable
- Type safety ensures data integrity
- Error boundaries handle loading failures gracefully

---

**Built with ❤️ for personal investment tracking and analysis.**
