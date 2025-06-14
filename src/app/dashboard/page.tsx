"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Calendar, CreditCard, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wallet className="w-7 h-7 text-primary" />
          Dashboard
        </h1>
        <p className="text-gray-500">Overview of your financial activity.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Income</CardTitle>
            <Banknote className="w-6 h-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">Rp 0</p>
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
            <p className="text-2xl font-semibold text-blue-600">Rp 0</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="py-3">
                <div className="font-medium">Activity Title</div>
                <div className="text-sm text-gray-500">Rp 0 • Description</div>
                <div className="text-xs text-gray-400">Timestamp</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
