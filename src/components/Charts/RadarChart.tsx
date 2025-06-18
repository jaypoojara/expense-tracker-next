import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartRadarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
  angleAxisDataKey: string;
  label: string;
};

const RadarChart = ({ data, dataKey, angleAxisDataKey, label }: Props) => {
  const maxExpense = Math.max(...(data || []).map((d) => d.amount));

  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={payload[0].payload.category || ""} />
          <CustomTooltipAmount amount={payload[0].payload.amount || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <RechartRadarChart
          outerRadius={100}
          width={500}
          height={400}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey={angleAxisDataKey} stroke="#808080" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, maxExpense]}
            stroke="#808080"
          />
          <Radar
            name={label}
            dataKey={dataKey}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip content={RenderCustomTooltip} />
          <Legend />
        </RechartRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
