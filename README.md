# Finansialku

**Finansialku** is a personal and household financial management web application built with **Next.js 14 (App Router)**, **Supabase**, **Tailwind CSS v4**, and **shadcn/ui**. It helps users track their income and expenses, then receive AI-generated insights to plan better financial goals.

## ✨ Features

### ✅ Phase 1 — MVP (Authentication & Income Tracking)
- [x] Project setup with Next.js 14, Tailwind v4, shadcn/ui, Supabase
- [x] Custom authentication (email + password)
- [x] Session handling using Supabase SSR helpers
- [x] Income tracking (form + list)
- [x] Dashboard summary UI with total income

### 🔄 In Progress — Phase 2 (Expenses & AI Insight)
- [x] Add expenses form & history
- [x] Calculate balance (income - expenses)
- [x] AI insight generation based on financial data using Groq (LLaMA 3)
- [ ] Financial suggestions for saving/investing goals
- [ ] Modular AI hook to reuse insight generator

### 🔜 Phase 3 — Shared Household Support
- [ ] Multi-user household feature
- [ ] Invite family members
- [ ] Role-based access

## 🧠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Database & Auth:** Supabase (PostgreSQL)
- **AI Integration:** Groq (LLaMA 3)
- **State & Utils:** React hooks, Supabase SSR
- **Design Pattern:** Scalable modular structure

## 🚀 Local Development

```bash
git clone https://github.com/yourusername/finansialku.git
cd finansialku
npm install
npm run dev
```

> Make sure `.env.local` includes your Supabase credentials.

## 📂 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── layout.tsx
│   │   └── page.tsx
│   ├── income/
│   │   └── page.tsx
│   └── expenses/
├── components/
│   ├── income/
│   ├── dashboard/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── supabase/
│   ├── config/
│   └── hooks/
```

## 📌 Roadmap Summary

### Phase 1 — ✅ Done
- Authentication
- Income tracking
- Dashboard skeleton + summary

### Phase 2 — 🟡 In Progress
- Expenses feature
- AI-powered financial insight (Groq)
- Modular AI helper hook

### Phase 3 — 🔜 Planned
- Multi-user household management

---

Made with ☕ by Thomas.  
Let's help people reach their financial goals with the help of AI 💰🤖
