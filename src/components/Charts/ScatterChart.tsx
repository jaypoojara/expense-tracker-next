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
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

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
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Expenses" data={data} fill="#8884d8" />
        </RechartScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChart;
