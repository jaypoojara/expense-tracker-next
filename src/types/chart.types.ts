// Chart data type definitions

export interface FinanceOverviewData {
  name: string;
  amount: number;
  fill?: string;
}

export interface MonthlyExpenseData {
  month: string;
  amount: number;
}

export interface IncomeTrendData {
  month: string;
  amount: number;
}

export interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}

export interface DailyExpenseData {
  date: string;
  amount: number;
}

export interface DailyAverageData {
  day: string;
  amount: number;
  average: number;
}

export interface PaymentMethodData {
  name: string;
  usage: number;
  fill: string;
}

export interface CategoryExpenseData {
  category: string;
  amount: number;
  fullMark: number;
}

export interface NecessitySpendingData {
  name: string;
  size: number;
  color: string;
}

export interface SpendingFunnelData {
  value: number;
  name: string;
  fill: string;
}

// Props interfaces for chart components
export interface ChartProps {
  className?: string;
}

export interface PieChartProps extends ChartProps {
  data: FinanceOverviewData[];
}

export interface LineChartProps extends ChartProps {
  data: MonthlyExpenseData[];
}

export interface AreaChartProps extends ChartProps {
  data: IncomeTrendData[];
}

export interface ComposedChartProps extends ChartProps {
  data: IncomeExpenseData[];
}

export interface BarChartProps extends ChartProps {
  data: DailyExpenseData[];
}

export interface ScatterChartProps extends ChartProps {
  data: DailyAverageData[];
}

export interface RadialBarChartProps extends ChartProps {
  data: PaymentMethodData[];
}

export interface RadarChartProps extends ChartProps {
  data: CategoryExpenseData[];
}

export interface TreemapProps extends ChartProps {
  data: NecessitySpendingData[];
}

export interface FunnelChartProps extends ChartProps {
  data: SpendingFunnelData[];
}

export interface ExpenseData {
  incomeTrends: {
    month: string;
    amount: number;
    category: string;
  }[];
  financeOverview: {
    name: string;
    amount: number;
  }[];
  incomeExpense: {
    month: string;
    income: number;
    expense: number;
  }[];
  last30DayExpense: {
    date: string;
    amount: number;
  }[];
  monthlyExpenses: {
    month: string;
    amount: number;
  }[];
  expenseCategory: {
    category: string;
    amount: number;
  }[];
  dailyAvg: {
    day: number;
    amount: number;
  }[];
  paymentMethods: {
    name: string;
    value: number;
    fill: string;
  }[];
  necessitySpends: {
    name: string;
    size: number;
  }[];
  spendingFunnel: {
    value: number;
    name: string;
    fill: string;
  }[];
};