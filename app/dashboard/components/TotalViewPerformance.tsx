import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type TotalViewPerformanceProps = {
  performance?: {
    total_count: string;
    view_count: string;
    sales: string;
    percentage: string;
  };
};

export default function TotalViewPerformance({
  performance,
}: TotalViewPerformanceProps) {
  const data = performance
    ? [
        {
          name: "View Count",
          value: parseFloat(performance.view_count || "0"),
        },
        {
          name: "Percentage",
          value: parseFloat(performance.percentage || "0"),
        },
        { name: "Sales", value: parseFloat(performance.sales || "0") },
      ]
    : [
        { name: "View Count", value: 16 },
        { name: "Percentage", value: 23 },
        { name: "Sales", value: 68 },
      ];

  const COLORS = ["#FF8042", "#00C49F", "#FFBB28"]; // Orange, Green, Yellow

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Position closer to the edge
    const x = cx + radius * Math.cos(-midAngle * RADIAN); // X-coordinate
    const y = cy + radius * Math.sin(-midAngle * RADIAN); // Y-coordinate

    return (
      <g>
        {/* Background Circle */}
        <circle cx={x} cy={y} r={16} fill="white" />
        {/* Text */}
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs font-semibold"
        >
          {`${data[index].value}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-300 w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-center mb-4">
        Total View Performance
      </h2>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-4"></div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              label={renderCustomLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total Count */}
      <div className="flex flex-col items-center mt-4">
        <p className="text-sm text-gray-500 mb-1">Total Count</p>
        <p className="text-2xl font-bold text-gray-900">
          {performance?.total_count || "565K"}
        </p>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-center text-gray-500">
        Here are some tips on how to improve your score.
      </p>

      {/* Button */}
      <button className="mt-4 bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-full shadow hover:shadow-md">
        Guide Views
      </button>

      {/* Legend */}
      <div className="mt-6 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[0] }}
          ></div>
          <span className="text-xs text-gray-500">View Count</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[1] }}
          ></div>
          <span className="text-xs text-gray-500">Percentage</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[2] }}
          ></div>
          <span className="text-xs text-gray-500">Sales</span>
        </div>
      </div>
    </div>
  );
}
