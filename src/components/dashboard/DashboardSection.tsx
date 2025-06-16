"use client";

import { supabase } from "@/lib/supabase/client";
import { Wallet, Banknote, CreditCard, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useAuth } from "@/hooks/useAuth";

export type Income = {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  created_at: string;
};

export default function DashboardSection() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [recentIncomes, setRecentIncomes] = useState<Income[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: incomes } = await supabase
        .from("incomes")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      const total =
        incomes?.reduce((acc, cur) => acc + Number(cur.amount), 0) || 0;
      setTotalIncome(total);
      setRecentIncomes(incomes?.slice(0, 3) || []);
    };

    fetchData();
  }, [user]);

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
            <p className="text-2xl font-semibold text-red-600">Rp 0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Balance</CardTitle>
            <Wallet className="w-6 h-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-600">
              Rp {Number(totalIncome).toLocaleString()}
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
          {recentIncomes.length === 0 ? (
            <p className="text-muted-foreground">No recent income activity.</p>
          ) : (
            recentIncomes.map((item) => (
              <Card key={item.id}>
                <CardContent className="py-3 space-y-1">
                  <div className="font-medium text-primary">
                    Rp {Number(item.amount).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                  <Badge variant={"default"}>Income</Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </>
  );
}
