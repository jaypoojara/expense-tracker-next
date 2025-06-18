import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as RechartComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
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
  xAxisDataKey: string;
  areaDataKey: string;
  barDataKey: string;
};

const ComposedChart = ({
  data,
  xAxisDataKey,
  areaDataKey,
  barDataKey,
}: Props) => {
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
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <RechartComposedChart data={data}>
          <XAxis
            dataKey={xAxisDataKey}
            stroke={`${isDarkMode ? "#ffffff" : "#000000"}`}
          />
          <YAxis />
          <Tooltip content={RenderCustomTooltip} />
          <Legend content={CustomLegend} />
          <CartesianGrid stroke="#808080" />
          <Area
            type="monotone"
            dataKey={areaDataKey}
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey={barDataKey} barSize={20} fill="#413ea0" />
        </RechartComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(ComposedChart);
