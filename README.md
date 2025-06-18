# Expense Tracker Dashboard

A responsive and visually-rich dashboard to track and analyze personal expenses, using a variety of modern charting techniques and UI components.

## 🧩 What This Project Is About

This project is an **expense tracking dashboard** designed to help users visualize and manage their financial data. It includes multiple charts to reflect trends, distributions, comparisons, and summaries of expenses and spending patterns.

Built with:

- ✅ **Next.js** for fast performance and file-based routing
- 🎨 **Tailwind CSS** for consistent, utility-first styling
- 📊 **Recharts** for interactive and composable charts
- 🧠 TypeScript for type safety and better developer experience

---

## 🚀 Development Process

1. **Scaffold Project:**

   - Set up a new Next.js project using TypeScript
   - Configure Tailwind CSS and alias paths for better organization

2. **Build UI Structure:**

   - Create reusable components like `ChartWrapper`, and `InfoCard`
   - Set up a responsive grid layout using Tailwind's grid utilities

3. **Integrate Charting Library:**

   - Used `Recharts` to create charts like Line, Bar, Pie, Radar, etc.
   - Data fed to each chart is mocked and can later be connected to APIs or a backend

4. **Style and Polish:**

   - Matched the theme with a light and dark mode dashboard
   - Added custom tooltips, legends, and labels to improve readability

5. **Optimize Layout Responsiveness:**
   - Custom layouts for combining full-width and split-grid charts on different screen sizes

---

## 📊 Charts & Libraries Used

### 📈 Charts Included:

| Chart Type       | Purpose                |
| ---------------- | ---------------------- |
| Line Chart       | Monthly Expenses       |
| Bar Chart        | Last 30 Day Expenses   |
| Area Chart       | Income Trends          |
| Pie Charts       | Financial Overview     |
| Radar Chart      | Expense by Category    |
| Funnel Chart     | Spending Funnel        |
| Radial Bar Chart | Payment Method Usage   |
| Scatter Plot     | Daily Average Expenses |
| Treemap          | Spending by Necessity  |
| Composed Chart   | Income vs Expense      |

### 📦 Libraries:

- [`recharts`](https://recharts.org/en-US):  
  Used for its simplicity, composability, and strong support for responsive charts.
- [`react-icons`](https://react-icons.github.io/react-icons/):  
  Used for integrating consistent icons in the dashboard cards and headers.

- [`tailwindcss`](https://tailwindcss.com/):  
  Provides rapid styling capabilities and responsive design utilities.

---

## 🛠️ Getting Started

### Prerequisites:

- Node.js ≥ 18.x

### Installation:

```bash
git clone https://github.com/jaypoojara/expense-tracker-next.git
cd expense-tracker-dashboard
npm install
```

### Running locally:

```bash
npm run dev
```


### Build the project:

```bash
npm run build
npm run start
```