"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

type Props = {
  content: string;
  loading: boolean;
};

export default function AIInsight({ content, loading }: Props) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Sparkles className="text-yellow-400" />
        <CardTitle>AI Insight</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm dark:prose-invert max-w-none">
        {loading ? (
          <p className="text-muted-foreground">Loading AI Insight...</p>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </CardContent>
    </Card>
  );
}
