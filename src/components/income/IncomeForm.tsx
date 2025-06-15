// components/income/IncomeForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function IncomeForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !description) return;

    setLoading(true);
    const { error } = await supabase.from("incomes").insert({
      amount,
      description,
    });
    setLoading(false);

    if (error) {
      toast.error("Failed to add income");
      return;
    }

    setAmount("");
    setDescription("");
    toast.success("Income added!");
    router.refresh(); // re-render the server component
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="amount">Amount (Rp)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="e.g. 500000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          placeholder="e.g. Salary, Bonus"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding..." : "Add Income"}
      </Button>
    </form>
  );
}
