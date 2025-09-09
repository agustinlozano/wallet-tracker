"use client";

import { useEffect, useState } from "react";
import { PortfolioSummaryCard } from "@/components/portfolio-summary-card";
import { AccountBalancesCard } from "@/components/account-balances-card";
import { AssetAllocationChart } from "@/components/asset-allocation-chart";
import { HoldingsTable } from "@/components/holdings-table";
import { CashFlowOverview } from "@/components/cash-flow-overview";
import {
  DailyPortfolioSnapshot,
  getMostRecentSnapshot,
  getHoldingsByAssetType,
  loadPortfolioData,
} from "@/lib/portfolio-utils";
import { RefreshCw, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<DailyPortfolioSnapshot[]>(
    []
  );
  const [currentSnapshot, setCurrentSnapshot] =
    useState<DailyPortfolioSnapshot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadPortfolioData();
      setPortfolioData(data);
      const recent = getMostRecentSnapshot(data);
      setCurrentSnapshot(recent);
      setSelectedDate(recent?.date || "");
    } catch (err) {
      setError("Failed to load portfolio data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const snapshot = portfolioData.find((data) => data.date === date);
    setCurrentSnapshot(snapshot || null);
  };

  // Sort portfolio data by date (most recent first) for the selector
  const sortedPortfolioData = [...portfolioData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Loading portfolio data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentSnapshot) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No portfolio data available</p>
      </div>
    );
  }

  const assetData = getHoldingsByAssetType(currentSnapshot);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Portfolio Dashboard
            </h1>
            <p className="text-muted-foreground">
              Viewing snapshot from:{" "}
              {new Date(currentSnapshot.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Date Selector */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedDate} onValueChange={handleDateChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {sortedPortfolioData.map((snapshot) => (
                    <SelectItem key={snapshot.date} value={snapshot.date}>
                      {new Date(snapshot.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {snapshot.date ===
                        getMostRecentSnapshot(portfolioData)?.date && (
                        <span className="ml-2 text-xs text-green-600">
                          (Latest)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadData}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="mb-8">
          <PortfolioSummaryCard
            summaries={currentSnapshot.portfolioSummaryTable.rows}
          />
        </div>

        {/* Asset Allocation and Account Balances */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <AssetAllocationChart assetData={assetData} />
          <AccountBalancesCard
            balances={currentSnapshot.accountBalancesTable.rows}
          />
        </div>

        {/* Cash Flow Overview */}
        <div className="mb-8">
          <CashFlowOverview
            securities={currentSnapshot.securityCashFlowTable.securities}
            schedule={currentSnapshot.cashFlowScheduleTable.schedule}
            grandTotal={currentSnapshot.securityCashFlowTable.grandTotal}
          />
        </div>

        {/* Detailed Holdings */}
        <div className="mb-8">
          <HoldingsTable
            holdings={currentSnapshot.investmentHoldingsTable.rows}
          />
        </div>
      </div>
    </div>
  );
}
