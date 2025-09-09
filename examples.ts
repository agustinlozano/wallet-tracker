import {
  AccountBalancesTable,
  CashFlowScheduleTable,
  CurrencyCashFlowTable,
  InvestmentHoldingsTable,
  PortfolioSummaryTable,
  SecurityCashFlowTable,
} from "./types/basis";

// Example data structures:
const examplePortfolioSummary: PortfolioSummaryTable = {
  title: "Portfolio Summary",
  rows: [
    {
      currency: "ARS",
      totalValue: "$12.504.612,88",
      return30d: "-5,39%",
    },
    {
      currency: "USD",
      totalValue: "$8.714,53",
      return30d: "-12,60%",
      mepExchangeRate: "$1.434,92",
    },
  ],
};

const exampleAccountBalances: AccountBalancesTable = {
  title: "Account Balances",
  rows: [
    {
      settlementTerm: "Immediate",
      arsBalance: "$3,192.12",
      mepUsdBalance: "$3,243.13",
      cclUsdBalance: "$120.06",
    },
    {
      settlementTerm: "24h",
      arsBalance: "$112,317.03",
      mepUsdBalance: "$893.33",
      cclUsdBalance: "$0.00",
    },
    {
      settlementTerm: "24h+",
      arsBalance: "$0.00",
      mepUsdBalance: "$0.00",
      cclUsdBalance: "$0.00",
    },
    {
      settlementTerm: "Committed",
      arsBalance: "$0.00",
      mepUsdBalance: "$0.00",
      cclUsdBalance: "$0.00",
    },
    {
      settlementTerm: "AvailableToTrade",
      arsBalance: "$115,509.15",
      mepUsdBalance: "$4,136.46",
      cclUsdBalance: "$120.06",
    },
  ],
};

const exampleInvestmentHoldings: InvestmentHoldingsTable = {
  title: "Investment Holdings",
  rows: [
    {
      assetType: "Equities",
      currentValueUSD: "$789.61",
      isSubtotal: true,
    },
    {
      assetType: "Equities",
      ticker: "CELU",
      position: "218 / 0",
      dailyChange: "-8.90%",
      lastPriceARS: "$174.00",
      avgCostUSD: "$0.80",
      returnPct: "-84.90%",
      returnUSD: "-$148.93",
      currentValueUSD: "$26.44",
    },
    {
      assetType: "Bonds",
      currentValueUSD: "$3,872.48",
      isSubtotal: true,
    },
    {
      assetType: "Bonds",
      ticker: "AE38",
      position: "2,014 / 0",
      dailyChange: "-6.65%",
      lastPriceARS: "$79,440.00",
      avgCostUSD: "$58.55",
      returnPct: "-0.96%",
      returnUSD: "-$11.30",
      currentValueUSD: "$1,114.99",
    },
    {
      assetType: "CEDEARS",
      currentValueUSD: "$505.84",
      isSubtotal: true,
    },
    {
      assetType: "Notes",
      currentValueUSD: "$10.80",
      isSubtotal: true,
    },
    {
      currentValueUSD: "$5,178.73",
      isTotal: true,
    },
  ],
};

// Example data structures:
const exampleSecurityCashFlow: SecurityCashFlowTable = {
  title: "Cash Flow Summary by Security",
  securities: [
    {
      ticker: "AE38",
      name: "BONOS ARGENTINA USD 2038 L.A",
      quantity: 2014,
      currency: "USD",
      couponPayment: 100.7,
      principalPayment: 0,
      totalPayment: 100.7,
    },
    {
      ticker: "GD29",
      name: "Bonos Globales Argentina USD 1% 2029",
      quantity: 185,
      currency: "USD",
      couponPayment: 1.04,
      principalPayment: 37.0,
      totalPayment: 38.04,
    },
    {
      ticker: "GD35",
      name: "Bonos Globales Argentina USD Step Up 2035",
      quantity: 3287,
      currency: "USD",
      couponPayment: 135.62,
      principalPayment: 0,
      totalPayment: 135.62,
    },
    {
      ticker: "YMCHD",
      name: "ON YPF SA REGS 4% V12/02/26 Cl. XVI",
      quantity: 69,
      currency: "USD",
      couponPayment: 0.35,
      principalPayment: 10.61,
      totalPayment: 10.97,
    },
  ],
  grandTotal: 285.34,
};

const exampleCurrencyCashFlow: CurrencyCashFlowTable = {
  title: "Cash Flow Summary by Currency",
  currencies: [
    {
      currency: "USD",
      totalCoupon: 237.72,
      totalPrincipal: 47.61,
      totalPayment: 285.34,
    },
  ],
};

const exampleCashFlowSchedule: CashFlowScheduleTable = {
  title: "Cash Flow Schedule",
  schedule: [
    {
      paymentDate: new Date("2025-11-12"),
      ticker: "YMCHD",
      name: "ON YPF SA REGS 4% V12/02/26 Cl. XVI",
      currency: "USD",
      couponPayment: 0.23,
      principalPayment: 5.3,
      totalPayment: 5.54,
    },
    {
      paymentDate: new Date("2026-01-09"),
      ticker: "AE38",
      name: "BONOS ARGENTINA USD 2038 L.A",
      currency: "USD",
      couponPayment: 50.35,
      principalPayment: 0,
      totalPayment: 50.35,
    },
    {
      paymentDate: new Date("2026-01-09"),
      ticker: "GD29",
      name: "Bonos Globales Argentina USD 1% 2029",
      currency: "USD",
      couponPayment: 0.59,
      principalPayment: 18.5,
      totalPayment: 19.09,
    },
    {
      paymentDate: new Date("2026-01-09"),
      ticker: "GD35",
      name: "Bonos Globales Argentina USD Step Up 2035",
      currency: "USD",
      couponPayment: 67.81,
      principalPayment: 0,
      totalPayment: 67.81,
    },
    {
      paymentDate: new Date("2026-02-12"),
      ticker: "YMCHD",
      name: "ON YPF SA REGS 4% V12/02/26 Cl. XVI",
      currency: "USD",
      couponPayment: 0.11,
      principalPayment: 5.3,
      totalPayment: 5.42,
    },
    {
      paymentDate: new Date("2026-07-09"),
      ticker: "AE38",
      name: "BONOS ARGENTINA USD 2038 L.A",
      currency: "USD",
      couponPayment: 50.35,
      principalPayment: 0,
      totalPayment: 50.35,
    },
    {
      paymentDate: new Date("2026-07-09"),
      ticker: "GD29",
      name: "Bonos Globales Argentina USD 1% 2029",
      currency: "USD",
      couponPayment: 0.45,
      principalPayment: 18.5,
      totalPayment: 18.95,
    },
    {
      paymentDate: new Date("2026-07-09"),
      ticker: "GD35",
      name: "Bonos Globales Argentina USD Step Up 2035",
      currency: "USD",
      couponPayment: 67.81,
      principalPayment: 0,
      totalPayment: 67.81,
    },
  ],
};
