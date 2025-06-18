import { DefaultLegendContentProps } from "recharts";

const CustomLegend = (props: DefaultLegendContentProps) => {
  const { payload } = props;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xl text-gray-700 font-medium capitalize">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
