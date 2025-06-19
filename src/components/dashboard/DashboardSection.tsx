"use client";

import { supabase } from "@/lib/supabase/client";
import { Wallet, Banknote, CreditCard, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useAiInsight } from "@/hooks/useAiInsight";
import AIInsight from "./AIInsight";

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  created_at: string;
  type: string;
};

export type Income = {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  created_at: string;
};

export default function DashboardSection({ userId }: { userId: string }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Transaction[]>([]);

  const { insight, loading, generateInsight } = useAiInsight();

  useEffect(() => {
    const fetchData = async () => {
      const { data: incomes } = await supabase
        .from("incomes")
        .select("*")
        .eq("user_id", userId);

      const { data: expenses } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId);

      const incomeTotal =
        incomes?.reduce((acc, cur) => acc + Number(cur.amount), 0) || 0;
      const expenseTotal =
        expenses?.reduce((acc, cur) => acc + Number(cur.amount), 0) || 0;

      const combined: (Transaction & { type: "income" | "expense" })[] = [
        ...(incomes?.map((d) => ({ ...d, type: "income" })) || []),
        ...(expenses?.map((d) => ({ ...d, type: "expense" })) || []),
      ].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

      setTotalIncome(incomeTotal);
      setTotalExpenses(expenseTotal);
      setRecentActivities(combined.slice(0, 5));
      generateInsight({ income: incomeTotal, expense: expenseTotal });
    };

    fetchData();
  }, [userId]);

  const balance = totalIncome - totalExpenses;

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Income</CardTitle>
            <Banknote className="w-6 h-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">
              Rp {Number(totalIncome).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Expenses</CardTitle>
            <CreditCard className="w-6 h-6 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">
              Rp {Number(totalExpenses).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Balance</CardTitle>
            <Wallet className="w-6 h-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-600">
              Rp {Number(balance).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivities.length === 0 ? (
            <p className="text-muted-foreground">
              No recent income or expense activity.
            </p>
          ) : (
            recentActivities.map((item) => (
              <Card key={item.id}>
                <CardContent className="py-3 space-y-1">
                  <div
                    className={`font-medium ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Rp {Number(item.amount).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                  <Badge
                    variant={item.type === "income" ? "default" : "destructive"}
                  >
                    {item.type}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      <section className="mt-6">
        <AIInsight content={insight || ""} loading={loading} />
      </section>
    </>
  );
}
