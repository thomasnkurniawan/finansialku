# 💸 FinAI — Smart Finance Tracker for Individuals & Households

FinAI is a modern, full-stack SaaS web application that helps individuals and households manage income, expenses, and financial balance — intelligently and effortlessly. Built with Next.js 14, Supabase, and styled using Tailwind CSS + ShadCN UI, it delivers a clean and scalable foundation for personal finance management.

---

## 📌 Features (Phase 1 - MVP)

- ✅ Email & Password Authentication (via Supabase)
- ✅ Session Handling with Auto-Redirect
- ✅ Protected Dashboard for Authenticated Users
- ✅ Dashboard Skeleton UI with Summary Cards:
  - Total Income
  - Total Expense
  - Balance
- ✅ Fully responsive UI with ShadCN components & Lucide icons
- 🔄 Add & track income entries (in progress)

---

## 🧱 Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Framework | [Next.js 14](https://nextjs.org)    |
| Auth/DB   | [Supabase](https://supabase.com)    |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Kit    | [ShadCN UI](https://ui.shadcn.com)  |
| Icons     | [Lucide](https://lucide.dev)        |
| Font      | [Nunito](https://fonts.google.com/specimen/Nunito) |

---

## 🚀 Getting Started

1. Clone the repo

```
git clone https://github.com/yourusername/finai.git
cd finai
```

2. Install dependencies

```
npm install
```

3. Set up your environment variables in .env.local

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run locally
```
npm run dev
```

📂 Project Structure
```
src/
├── app/                 # App router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── dashboard/       # Dashboard route
├── components/          # Reusable components
│   └── ui/              # ShadCN components
├── lib/                 # Supabase client setup, helpers
├── styles/              # Global styles
└── types/               # Shared types (if needed)
```

🤝 License

This project is open-source and available under the MIT License.

👤 Author

Made with ❤️ by @tomisedunia