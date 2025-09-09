// Base reusable types
export type Currency = "ARS" | "USD";
export type InvestmentType = "Equities" | "Bonds" | "CEDEARS" | "Notes";
export type SettlementTerm =
  | "Immediate"
  | "24h"
  | "24h+"
  | "Committed"
  | "AvailableToTrade";

// Table 1: Portfolio Summary
export interface PortfolioSummary {
  currency: "ARS" | "USD";
  totalValue: string; // Formatted as "$12.504.612,88"
  return30d: string; // Formatted as "-5,39%"
  mepExchangeRate?: string; // Optional, formatted as "$1.434,92" or undefined for ARS
}

// Table 2: Available Balances
export interface AccountBalance {
  settlementTerm: SettlementTerm;
  arsBalance: string; // Formatted as "$3,192.12"
  mepUsdBalance: string; // Formatted as "$3,243.13"
  cclUsdBalance: string; // Formatted as "$120.06"
}

// Table 3: Investment Holdings - Detail row
export interface HoldingDetail {
  assetType?: InvestmentType; // Optional for subtotal/total rows
  ticker?: string; // Optional for subtotal/total rows
  position?: string; // Formatted as "218 / 0" (available/pledged), optional
  dailyChange?: string; // Formatted as "-8.90%", optional
  lastPriceARS?: string; // Formatted as "$174.00", optional
  avgCostUSD?: string; // Formatted as "$0.80" or "--", optional
  returnPct?: string; // Formatted as "-84.90%", optional
  returnUSD?: string; // Formatted as "-$148.93", optional
  currentValueUSD: string; // Formatted as "$26.44" or **$789.61** for subtotals
  isSubtotal?: boolean; // Identifies subtotal rows
  isTotal?: boolean; // Identifies grand total row
}

// Complete table structures
export interface PortfolioSummaryTable {
  title: string;
  rows: PortfolioSummary[];
}

export interface AccountBalancesTable {
  title: string;
  rows: AccountBalance[];
}

export interface InvestmentHoldingsTable {
  title: string;
  rows: HoldingDetail[];
}

// Cash Flow Tables
// Table 1: Cash Flow Summary by Security
export interface SecurityCashFlow {
  ticker: string;
  name: string;
  quantity: number;
  currency: Currency;
  couponPayment: number; // "Renta" in USD
  principalPayment: number; // "Amortización" in USD
  totalPayment: number; // "Total" in USD
}

// Table 2: Cash Flow Summary by Currency
export interface CurrencyCashFlow {
  currency: Currency;
  totalCoupon: number; // Total coupon payments
  totalPrincipal: number; // Total principal payments
  totalPayment: number; // Total payments
}

// Table 3: Cash Flow Schedule
export interface CashFlowSchedule {
  paymentDate: Date; // Formatted as "12/11/2025"
  ticker: string;
  name: string;
  currency: Currency;
  couponPayment: number; // "Renta" in USD
  principalPayment: number; // "Amortización" in USD
  totalPayment: number; // "Total" in USD
}

// Complete table structures
export interface SecurityCashFlowTable {
  title: string;
  securities: SecurityCashFlow[];
  grandTotal: number;
}

export interface CurrencyCashFlowTable {
  title: string;
  currencies: CurrencyCashFlow[];
}

export interface CashFlowScheduleTable {
  title: string;
  schedule: CashFlowSchedule[];
}
