import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomLegend from "../Common/CustomLegend";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import useTheme from "@/hooks/useTheme";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
  xAxisdataKey: string;
};

const LineChart = ({ data, dataKey, xAxisdataKey }: Props) => {
  const { isDarkMode } = useTheme();

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
          <Tooltip />
          <Legend content={CustomLegend} />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </RechartLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
