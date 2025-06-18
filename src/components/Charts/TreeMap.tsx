import {
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Treemap as RechartTreemap,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import TooltipWrapper from "../Common/TooltipWrapper";
import CustomTooltipCategory from "../Common/CustomTooltipCategory";
import CustomTooltipAmount from "../Common/CustomTooltipAmount";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
};

const TreeMap = ({ data, dataKey }: Props) => {
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
        <RechartTreemap
          width={500}
          height={300}
          data={data}
          dataKey={dataKey}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip content={RenderCustomTooltip} />
        </RechartTreemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreeMap;
