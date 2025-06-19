"use client";
import {
  PieChart,
  LineChart,
  ComposedChart,
  AreaChart,
  BarChart,
  RadarChart,
  ScatterChart,
  RadialBarChart,
  TreeMap,
  FunnelChart,
} from "@/components/Charts";
import ChartWrapper from "../Common/ChartWrapper";
import { chartTitles } from "@/constants";
import { ExpenseData } from "@/types/chart.types";

interface ChartGridProps {
  data: ExpenseData;
}

export const ChartGrid = ({ data }: ChartGridProps) => {
  const {
    financeOverview,
    monthlyExpenses,
    incomeTrends,
    incomeExpense,
    last30DayExpense,
    dailyAvg,
    paymentMethods,
    expenseCategory,
    necessitySpends,
    spendingFunnel,
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-6">
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.financialOverview}>
          <PieChart
            label="Total Balance"
            totalAmount={100}
            data={financeOverview}
            dataKey="amount"
          />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.monthlyExpenses}>
          <LineChart
            data={monthlyExpenses}
            xAxisdataKey="month"
            dataKey="amount"
          />
        </ChartWrapper>
      </div>
      <div className="col-span-full">
        <ChartWrapper title={chartTitles.incomeTrends}>
          <AreaChart
            data={incomeTrends}
            xAxisDataKey="month"
            dataKey="amount"
          />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.incomeVsExpense}>
          <ComposedChart
            data={incomeExpense}
            xAxisDataKey={"month"}
            areaDataKey={"income"}
            barDataKey={"expense"}
          />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.last30DaySpends}>
          <BarChart
            data={last30DayExpense}
            dataKey="amount"
            xAxisdataKey="month"
          />
        </ChartWrapper>
      </div>
      <div className="col-span-full">
        <ChartWrapper title={chartTitles.dailyAverageExpenses}>
          <ScatterChart
            data={dailyAvg}
            xAxisdataKey={"day"}
            yAxisdataKey={"amount"}
            xAxisLabel={"Day"}
            yAxisLabel={"Amount"}
          />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.paymentMethodUsage}>
          <RadialBarChart data={paymentMethods} dataKey="value" />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.expenseCategory}>
          <RadarChart
            data={expenseCategory}
            dataKey={"amount"}
            angleAxisDataKey={"category"}
            label={"Expenses"}
          />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.spendingByNecessity}>
          <TreeMap data={necessitySpends} dataKey={"size"} />
        </ChartWrapper>
      </div>
      <div className="lg:col-span-6">
        <ChartWrapper title={chartTitles.spendingFunnel}>
          <FunnelChart data={spendingFunnel} dataKey={"value"} />
        </ChartWrapper>
      </div>
    </div>
  );
};
