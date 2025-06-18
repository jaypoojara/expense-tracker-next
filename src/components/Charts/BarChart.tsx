import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { getBarColor } from "../../utils/helpers/getBarColor";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
  xAxisdataKey: string;
};

const BarChart = ({ data, dataKey, xAxisdataKey }: Props) => {
  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipAmount amount={payload[0].value as number} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <RechartBarChart data={data}>
          <XAxis
            dataKey={xAxisdataKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<RenderCustomTooltip />} />
          <Bar dataKey={dataKey} radius={[10, 10, 0, 0]}>
            {data?.map((_, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </RechartBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
