"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountBalance } from "@/types/basis";

interface AccountBalancesCardProps {
  balances: AccountBalance[];
}

export function AccountBalancesCard({ balances }: AccountBalancesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-1">Settlement Term</th>
                <th className="text-right py-2 px-1">ARS</th>
                <th className="text-right py-2 px-1">MEP USD</th>
                <th className="text-right py-2 px-1">CCL USD</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((balance, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-1 font-medium">
                    {balance.settlementTerm}
                  </td>
                  <td className="text-right py-2 px-1 font-mono">
                    {balance.arsBalance}
                  </td>
                  <td className="text-right py-2 px-1 font-mono">
                    {balance.mepUsdBalance}
                  </td>
                  <td className="text-right py-2 px-1 font-mono">
                    {balance.cclUsdBalance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
