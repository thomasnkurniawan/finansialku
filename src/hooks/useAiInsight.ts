// hooks/useAiInsight.ts
import { useState } from "react";
import { callGroq } from "@/lib/ai/groq";

export function useAiInsight() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = async (data: { income: number; expense: number }) => {
    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a financial advisor AI. Your goal is to help people understand their income, spending, and recommend simple, practical next steps to improve their financial health.",
        },
        {
          role: "user",
          content: `My total income this month is Rp ${data.income.toLocaleString(
            "id-ID"
          )} and my total expenses are Rp ${data.expense.toLocaleString(
            "id-ID"
          )}. What can I improve or consider?`,
        },
      ];

      const response = await callGroq(messages);
      setInsight(response);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    insight,
    loading,
    error,
    generateInsight,
  };
}
