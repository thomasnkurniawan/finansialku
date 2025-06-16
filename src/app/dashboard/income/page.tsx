// app/income/page.tsx
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IncomeForm from "@/components/income/IncomeForm";
import { createClient } from "@/lib/supabase/server";

export default async function IncomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: incomes, error } = await supabase
    .from("incomes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching incomes:", error.message);
  }

  return (
    <main className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Income</CardTitle>
        </CardHeader>
        <CardContent>
          <IncomeForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {incomes?.length === 0 && (
            <p className="text-muted-foreground">No income records yet.</p>
          )}
          {incomes?.map((item) => (
            <div
              key={item.id}
              className="border rounded p-2 shadow-sm flex flex-col gap-1"
            >
              <div className="font-medium text-primary">
                Rp {Number(item.amount).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
