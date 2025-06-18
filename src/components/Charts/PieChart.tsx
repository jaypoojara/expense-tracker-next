import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  TooltipProps,
} from "recharts";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import CustomLegend from "../Common/CustomLegend";
import { PIE_CHART_COLORS } from "@/constants";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import useTheme from "@/hooks/useTheme";
import { memo } from "react";

type PieChartProps = Pick<CategoricalChartProps, "data"> & {
  label: string;
  totalAmount: number;
  dataKey: string;
};

const PieChart = ({ label, totalAmount, data, dataKey }: PieChartProps) => {
  const { isDarkMode } = useTheme();

  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={payload[0].name || ""} />
          <CustomTooltipAmount amount={payload[0].value || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <RechartPieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={RenderCustomTooltip} />
        <Legend content={CustomLegend} />
        <text
          x="50%"
          y="50%"
          dy={-25}
          textAnchor="middle"
          fill={`${isDarkMode ? "#808080" : "#000000"}`}
          fontSize="16px"
        >
          {label}
        </text>

        <text
          x="50%"
          y="50%"
          dy={8}
          textAnchor="middle"
          fill={`${isDarkMode ? "#808080" : "#000000"}`}
          fontSize="24px"
          fontWeight="semi-bold"
        >
          {totalAmount}
        </text>
      </RechartPieChart>
    </ResponsiveContainer>
  );
};

export default memo(PieChart);
