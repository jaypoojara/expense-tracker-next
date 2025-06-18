import {
  Funnel,
  FunnelChart as RechartFunnelChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
};

const FunnelChart = ({ data, dataKey }: Props) => {
  const RenderCustomTooltip = ({
    active,
    payload,
  }: TooltipProps<NameType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <TooltipWrapper>
          <CustomTooltipCategory category={payload[0].payload.name || ""} />
          <CustomTooltipAmount amount={payload[0].value || 0} />
        </TooltipWrapper>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <RechartFunnelChart width={730} height={250} margin={{ left: 5 }}>
          <Tooltip content={RenderCustomTooltip} />
          <Funnel dataKey={dataKey} data={data} isAnimationActive></Funnel>
        </RechartFunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChart;
