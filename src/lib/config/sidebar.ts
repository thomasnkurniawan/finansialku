// lib/config/sidebar.ts
import {
  Wallet,
  Banknote,
  CreditCard,
} from "lucide-react"

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: Wallet,
    href: "/dashboard",
  },
  {
    label: "Income",
    icon: Banknote,
    href: "/dashboard/income",
  },
  {
    label: "Expenses",
    icon: CreditCard,
    href: "/dashboard/expenses",
  },
]
