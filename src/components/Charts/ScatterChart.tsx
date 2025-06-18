import useTheme from "@/hooks/useTheme";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { memo } from "react";

type Props = Pick<CategoricalChartProps, "data"> & {
  xAxisdataKey: string;
  yAxisdataKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
};
const ScatterChart = ({
  data,
  xAxisdataKey,
  yAxisdataKey,
  xAxisLabel,
  yAxisLabel,
}: Props) => {
  const { isDarkMode } = useTheme();

  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipAmount amount={payload[0].value || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <RechartScatterChart width={600} height={400}>
          <CartesianGrid />
          <XAxis
            dataKey={xAxisdataKey}
            name={xAxisLabel}
            stroke={`${isDarkMode ? "#ffffff" : "#000000"}`}
          />
          <YAxis
            dataKey={yAxisdataKey}
            name={yAxisLabel}
            stroke={`${isDarkMode ? "#808080" : "#000000"}`}
          />
          <Tooltip content={RenderCustomTooltip} />
          <Legend />
          <Scatter name="Expenses" data={data} fill="#8884d8" />
        </RechartScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(ScatterChart);
