**Project Name:** Personal Investment Portfolio Tracker & Historical Analyzer

**1. Objective:**
Create a web application that serves as a daily snapshot and historical analysis tool for my personal investment portfolio. The core function is to accept daily scraped JSON data from my brokerage (AlyC), store it, and present it through both daily and historical views, allowing me to track performance and changes over time.

**2. Core Data Structure (Input):**
The application will receive a JSON payload daily, structured according to the following TypeScript interfaces. This data is scraped from my broker's website and represents a complete snapshot of my portfolio for that day.

See types and data samples below

- types/basis.ts
- examples.ts

**3. Key Features & User Stories:**

- **Feature 1: Daily Data Ingestion**

  - To make it simpler now, we gonna use a JSON file into this repo. It should be an array of these objects:
  - AccountBalancesTable
  - CashFlowScheduleTable
  - CurrencyCashFlowTable
  - InvestmentHoldingsTable
  - PortfolioSummaryTable
  - SecurityCashFlowTable

- **Feature 2: Daily View Dashboard**

  - **As a user,** I can view a dashboard that displays the most recent portfolio snapshot, organized clearly by the tables defined in the interfaces:
    - Portfolio Summary (Total Value in ARS/USD, 30-day return).
    - Account Balances (ARS, MEP USD, CCL USD across settlement terms).
    - Detailed Investment Holdings (Breakdown by Equities, Bonds, CEDEARS, Notes with tickers, quantities, prices, and P&L).
    - Projected Cash Flows (Coupon and principal payments from bonds and notes).

- **Feature 3: Historical Analysis & Time Series Charts**

  - **As a user,** I can view historical charts of my portfolio's total equity value over time, with the ability to toggle between ARS and USD views.
  - **As a user,** I can view the historical performance of individual asset types (e.g., see a chart of the total value of my "Bonds" holdings over the last 30/90/365 days).
  - **As a user,** I can view the historical performance of individual tickers (e.g., see the daily `currentValueUSD` and `returnPct` for `PAMP` over time).
  - **As a user,** I can view the history of my account balances to track liquidity trends.

- **Feature 4: Data Comparison**
  - **As a user,** I can select any two dates and compare the portfolio snapshots side-by-side to see what changed (e.g., new positions, changes in quantity, price movements).

**4. Technical Requirements & Stack Suggestions:**

- **Backend Framework:** Node.js with Express.js or Python with FastAPI. Primary role: receive data, validate it, store it, and serve it for historical queries.
- **Database:** A time-series friendly database is ideal. Options:
  - **PostgreSQL:** A robust general-purpose choice. Can use a simple table structure with a `date` column.
  - **SQLite:** Perfect for a single-user application, simple to set up.
  - **TimescaleDB:** (Advanced) An extension for PostgreSQL optimized for time-series data, excellent for this use case.
- **Frontend Framework:** React.js or Next.js is highly recommended for building interactive dashboards and charts.
- **Charting Library:** Use a powerful library like **Chart.js**, **Recharts**, or **Plotly.js** to render the historical time series graphs.
- **API Design:** RESTful API endpoints for submitting data and fetching historical data ranges.

**5. Implementation Steps Outline for the Agent:**

1.  **Project Setup:** Initialize the backend and frontend projects. Install necessary dependencies (validation library like `zod` or `joi`, database ORM, charting library).
2.  **Database Schema Design:** Design SQL tables that map directly to the TypeScript interfaces, ensuring each record has a `date` field. For example:
    - `table portfolio_summary (date, currency, totalValue, return30d, mepExchangeRate)`
    - `table holdings (date, assetType, ticker, position, currentValueUSD, ...)`
3.  **Build Data Ingestion API:** Create the POST endpoint. Implement rigorous validation using the interfaces to ensure data integrity before storing it in the database.
4.  **Build Historical Query APIs:** Create GET endpoints to fetch data for specific dates or date ranges (e.g., `/api/holdings?from=2024-01-01&to=2024-04-01&ticker=PAMP`).
5.  **Develop Daily Dashboard Frontend:** Create the main view that fetches and displays the latest data from the backend.
6.  **Develop Historical Charts Frontend:** Build the components that fetch time-series data from the historical APIs and render it using the chosen charting library. Implement date pickers and filters.
7.  **Styling & Polish:** Apply CSS/styling library (e.g., Tailwind CSS) to make the application clean and usable.

**6. Desired Outcome:**
A functional, private web application that transforms my daily raw scraped brokerage data into a valuable tool for visualizing portfolio performance, understanding trends, and making more informed investment decisions through historical context.
