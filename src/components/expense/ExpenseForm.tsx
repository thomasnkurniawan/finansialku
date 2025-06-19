// components/expenses/ExpenseForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (!amount) {
      toast.error("Amount is required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("expenses").insert({
      user_id: user?.id,
      amount: parseFloat(amount),
      description,
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to add expense");
    } else {
      toast.success("Expense added");
      setAmount("");
      setDescription("");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Amount (Rp)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleAddExpense} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
