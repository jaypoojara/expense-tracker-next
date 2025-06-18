import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type Props = Pick<CategoricalChartProps, "data"> & {
  dataKey: string;
  angleAxisDataKey: string;
  label: string;
};

const RadarChart = ({ data, dataKey, angleAxisDataKey, label }: Props) => {
  const maxExpense = Math.max(...(data || []).map((d) => d.amount));

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
          <Tooltip />
          <Legend />
        </RechartRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
