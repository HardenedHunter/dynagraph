import {
  LineChart as RechartsLineChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useYAxisWidth } from "~/shared/ui/mdxComponents/LineChart/lib";

const colors = [
  "#f87171", // red-400
  "#fb923c", // orange-400
  "#facc15", // yellow-400
  "#a3e635", // lime-400
  "#34d399", // emerald-400
  "#22d3ee", // cyan-400
  "#60a5fa", // blue-400
  "#f472b6", // pink-400
  "#a3a3a3", // neutral-400
];

type LineChartDataItem = {
  name: string | number;
  [key: string]: string | number;
};

type LineChartData = LineChartDataItem[];

type LineChartProps = {
  data: LineChartData;
  lines: {
    dataKey: string;
    stroke?: string;
  }[];
};

export const LineChart: FCC<LineChartProps> = ({ data, lines }) => {
  const { width: yAxisWidth, ref } = useYAxisWidth();

  const initialColorIndex = data.length % colors.length;

  return (
    <ResponsiveContainer>
      <RechartsLineChart
        ref={ref}
        data={data}
        margin={{ top: 1, right: 1, left: 1, bottom: 1 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={yAxisWidth} />
        <Tooltip />
        <Legend />
        {lines.map(({ dataKey, stroke }, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={dataKey}
            strokeWidth={2}
            stroke={stroke ?? colors[(initialColorIndex + i) % colors.length]}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
