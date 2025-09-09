"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioSummary } from "@/types/basis";
import {
  parseCurrency,
  parsePercentage,
  getPercentageColor,
} from "@/lib/portfolio-utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface PortfolioSummaryCardProps {
  summaries: PortfolioSummary[];
}

export function PortfolioSummaryCard({ summaries }: PortfolioSummaryCardProps) {
  const usdSummary = summaries.find((s) => s.currency === "USD");
  const arsSummary = summaries.find((s) => s.currency === "ARS");

  const usdReturn = usdSummary ? parsePercentage(usdSummary.return30d) : 0;
  const arsReturn = arsSummary ? parsePercentage(arsSummary.return30d) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* USD Summary */}
      {usdSummary && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value (USD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usdSummary.totalValue}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {usdReturn >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={getPercentageColor(usdReturn)}>
                {usdSummary.return30d} from last month
              </span>
            </div>
            {usdSummary.mepExchangeRate && (
              <div className="text-xs text-muted-foreground mt-1">
                MEP Rate: {usdSummary.mepExchangeRate}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ARS Summary */}
      {arsSummary && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value (ARS)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{arsSummary.totalValue}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {arsReturn >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={getPercentageColor(arsReturn)}>
                {arsSummary.return30d} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
