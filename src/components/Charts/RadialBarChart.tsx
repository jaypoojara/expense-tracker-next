import {
  RadialBarChart as RechartRadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { memo } from "react";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
};

const RadialBarChart = ({ data, dataKey }: Props) => {
  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={payload[0].payload.method || ""} />
          <CustomTooltipAmount amount={payload[0].value || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <RechartRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          barSize={20}
          data={data}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#fff" }}
            background
            dataKey={dataKey}
          />

          <Tooltip content={RenderCustomTooltip} />

          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </RechartRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(RadialBarChart);
