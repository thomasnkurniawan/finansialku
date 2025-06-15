// src/app/page.tsx

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to FinAI</h1>
      <p className="text-center max-w-md mb-6 text-gray-600">
        Helping individuals and households manage income with AI smart tracking.
      </p>

      {session ? (
        <Link href="/dashboard" className="bg-black text-white px-4 py-2 rounded">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded">
          Get Started
        </Link>
      )}
    </main>
  );
}
