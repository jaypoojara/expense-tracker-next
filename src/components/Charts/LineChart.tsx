import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartLineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import CustomLegend from "../Common/CustomLegend";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import useTheme from "@/hooks/useTheme";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { memo } from "react";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
  xAxisdataKey: string;
};

const LineChart = ({ data, dataKey, xAxisdataKey }: Props) => {
  const { isDarkMode } = useTheme();

  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={payload[0].payload.month || ""} />
          <CustomTooltipAmount amount={payload[0].value || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-7">
      <ResponsiveContainer width="100%" height={350}>
        <RechartLineChart
          style={{ background: "transparent" }}
          className="bg-gray-300"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={`${isDarkMode ? "#808080" : "#000000"}`}
          />
          <XAxis
            dataKey={xAxisdataKey}
            stroke={`${isDarkMode ? "#ffffff" : "#000000"}`}
          />
          <YAxis />
          <Tooltip content={RenderCustomTooltip} />
          <Legend content={CustomLegend} />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </RechartLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(LineChart);
