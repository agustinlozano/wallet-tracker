"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoldingDetail } from "@/types/basis";
import { parsePercentage, getPercentageColor } from "@/lib/portfolio-utils";

interface HoldingsTableProps {
  holdings: HoldingDetail[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const individualHoldings = holdings.filter(
    (holding) => !holding.isSubtotal && !holding.isTotal && holding.ticker
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-1">Type</th>
                <th className="text-left py-2 px-1">Ticker</th>
                <th className="text-right py-2 px-1">Position</th>
                <th className="text-right py-2 px-1">Daily Change</th>
                <th className="text-right py-2 px-1">Return %</th>
                <th className="text-right py-2 px-1">Return USD</th>
                <th className="text-right py-2 px-1">Current Value</th>
              </tr>
            </thead>
            <tbody>
              {individualHoldings.map((holding, index) => {
                const dailyChangeNum = holding.dailyChange
                  ? parsePercentage(holding.dailyChange)
                  : 0;
                const returnPct = holding.returnPct
                  ? parsePercentage(holding.returnPct)
                  : 0;

                return (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-1">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                        {holding.assetType}
                      </span>
                    </td>
                    <td className="py-2 px-1 font-medium font-mono">
                      {holding.ticker}
                    </td>
                    <td className="text-right py-2 px-1 font-mono">
                      {holding.position || "--"}
                    </td>
                    <td
                      className={`text-right py-2 px-1 font-mono ${getPercentageColor(
                        dailyChangeNum
                      )}`}
                    >
                      {holding.dailyChange || "--"}
                    </td>
                    <td
                      className={`text-right py-2 px-1 font-mono ${getPercentageColor(
                        returnPct
                      )}`}
                    >
                      {holding.returnPct || "--"}
                    </td>
                    <td
                      className={`text-right py-2 px-1 font-mono ${getPercentageColor(
                        returnPct
                      )}`}
                    >
                      {holding.returnUSD || "--"}
                    </td>
                    <td className="text-right py-2 px-1 font-mono font-medium">
                      {holding.currentValueUSD}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t">
          {holdings
            .filter((holding) => holding.isSubtotal)
            .map((subtotal, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1"
              >
                <span className="font-medium">{subtotal.assetType} Total:</span>
                <span className="font-mono font-bold">
                  {subtotal.currentValueUSD}
                </span>
              </div>
            ))}

          {holdings
            .filter((holding) => holding.isTotal)
            .map((total, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 text-lg font-bold border-t mt-2 pt-2"
              >
                <span>Portfolio Total:</span>
                <span className="font-mono">{total.currentValueUSD}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
