import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSection from "@/components/dashboard/DashboardSection";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return (
    <div className="max-w-full px-4 py-4 space-y-8">
      <header className="mb-4">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-gray-500">Overview of your financial activity.</p>
        </div>
      </header>

      <DashboardSection userId={user.id} />
    </div>
  );
}
