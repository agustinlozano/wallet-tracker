"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityCashFlow, CashFlowSchedule } from "@/types/basis";
import { formatCurrency } from "@/lib/portfolio-utils";

interface CashFlowOverviewProps {
  securities: SecurityCashFlow[];
  schedule: CashFlowSchedule[];
  grandTotal: number;
}

export function CashFlowOverview({
  securities,
  schedule,
  grandTotal,
}: CashFlowOverviewProps) {
  // Get next 3 upcoming payments
  const upcomingPayments = schedule
    .filter((payment) => new Date(payment.paymentDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime()
    )
    .slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Cash Flow Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Expected:</span>
              <span className="font-mono">{formatCurrency(grandTotal)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              From {securities.length} securities
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {securities.slice(0, 3).map((security, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="font-mono">{security.ticker}</span>
                <span className="font-mono">
                  {formatCurrency(security.totalPayment)}
                </span>
              </div>
            ))}
            {securities.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{securities.length - 3} more securities
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingPayments.length > 0 ? (
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-sm font-medium">
                      {payment.ticker}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-medium">
                      {formatCurrency(payment.totalPayment)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      C: {formatCurrency(payment.couponPayment)} | P:{" "}
                      {formatCurrency(payment.principalPayment)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No upcoming payments scheduled
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
