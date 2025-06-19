// app/dashboard/expenses/page.tsx
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import ExpenseForm from "@/components/expense/ExpenseForm";

export default async function ExpensesPage() {
  const supabaseServer = await createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) redirect("/");

  const { data: expenses } = await supabaseServer
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses?.length === 0 && (
            <p className="text-muted-foreground">No expense records yet.</p>
          )}
          {expenses?.map((item) => (
            <div
              key={item.id}
              className="border rounded p-2 shadow-sm flex flex-col gap-1"
            >
              <div className="font-medium text-red-600">
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
