import { memo } from "react";
import {
  AreaChart as RechartAreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { IncomeTrendData } from "@/types/chart.types";
import useTheme from "@/hooks/useTheme";

interface ChartData {
  month: string;
  amount: number;
  category: string;
}

interface AreaChartProps {
  data: IncomeTrendData[];
  xAxisDataKey: string;
  dataKey: string;
}

const AreaChart = ({ data, xAxisDataKey, dataKey }: AreaChartProps) => {
  const { isDarkMode } = useTheme();

  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartData;

      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={data.category} />
          <CustomTooltipAmount amount={data.amount} />
        </TooltipWrapper>
      );
    }

    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <RechartAreaChart data={data} style={{ background: "transparent" }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke={`${isDarkMode ? "#ffffff" : "#000000"}`}
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<RenderCustomTooltip />} />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#875cf5"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </RechartAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(AreaChart);
