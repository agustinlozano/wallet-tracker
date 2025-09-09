import {
  AccountBalancesTable,
  CashFlowScheduleTable,
  CurrencyCashFlowTable,
  InvestmentHoldingsTable,
  PortfolioSummaryTable,
  SecurityCashFlowTable,
} from "@/types/basis";

export interface DailyPortfolioSnapshot {
  date: string;
  portfolioSummaryTable: PortfolioSummaryTable;
  accountBalancesTable: AccountBalancesTable;
  investmentHoldingsTable: InvestmentHoldingsTable;
  securityCashFlowTable: SecurityCashFlowTable;
  currencyCashFlowTable: CurrencyCashFlowTable;
  cashFlowScheduleTable: CashFlowScheduleTable;
}

// Utility function to parse currency values like "$12.504.612,88" to numbers
export function parseCurrency(value: string): number {
  if (!value || value === "--") return 0;

  // Remove currency symbols, spaces, and convert to standard format
  const cleaned = value
    .replace(/[$\s]/g, "")
    .replace(/\./g, "") // Remove thousands separators
    .replace(",", "."); // Convert decimal separator

  return parseFloat(cleaned) || 0;
}

// Utility function to parse percentage values like "-5,39%" to numbers
export function parsePercentage(value: string): number {
  if (!value || value === "--") return 0;

  const cleaned = value.replace("%", "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

// Format currency for display
export function formatCurrency(
  value: number,
  currency: "USD" | "ARS" = "USD"
): string {
  const symbol = currency === "USD" ? "$" : "$";

  if (currency === "ARS") {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

// Format percentage for display
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

// Get color for percentage values (green for positive, red for negative)
export function getPercentageColor(value: number): string {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-600";
}

// Load portfolio data from JSON file
export async function loadPortfolioData(): Promise<DailyPortfolioSnapshot[]> {
  try {
    const response = await fetch("/api/portfolio-data");
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return [];
  }
}

// Get the most recent portfolio snapshot
export function getMostRecentSnapshot(
  data: DailyPortfolioSnapshot[]
): DailyPortfolioSnapshot | null {
  if (!data.length) return null;

  return data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
}

// Calculate total portfolio value in USD
export function getTotalPortfolioValueUSD(
  snapshot: DailyPortfolioSnapshot
): number {
  const usdSummary = snapshot.portfolioSummaryTable.rows.find(
    (row) => row.currency === "USD"
  );
  return usdSummary ? parseCurrency(usdSummary.totalValue) : 0;
}

// Get holdings by asset type
export function getHoldingsByAssetType(snapshot: DailyPortfolioSnapshot) {
  const holdings = snapshot.investmentHoldingsTable.rows;
  const subtotals = holdings.filter((holding) => holding.isSubtotal);

  return subtotals.map((subtotal) => ({
    assetType: subtotal.assetType!,
    value: parseCurrency(subtotal.currentValueUSD),
    formattedValue: subtotal.currentValueUSD,
  }));
}

// Get individual holdings (non-subtotal, non-total rows)
export function getIndividualHoldings(snapshot: DailyPortfolioSnapshot) {
  return snapshot.investmentHoldingsTable.rows.filter(
    (holding) => !holding.isSubtotal && !holding.isTotal && holding.ticker
  );
}
