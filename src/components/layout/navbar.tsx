"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { sidebarItems } from "@/lib/config/sidebar";

export function SidebarHeader() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data?.user?.email ?? "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getTitleFromPath = (pathname: string): string => {
    const item = sidebarItems.find((item) => item.href === pathname);
    return item?.label || "Finansialku";
  };

  const pageTitle = getTitleFromPath(pathname);

  return (
    <header className="flex items-center justify-between py-3 border-b bg-background rounded-t-xl">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{email}</span>
          <Button
            size="sm"
            onClick={handleLogout}
            variant="outline"
            className="cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
