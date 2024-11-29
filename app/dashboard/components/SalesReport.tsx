import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

type SalesProps = {
  sales: {
    product_launched: number;
    ongoing_product: number;
    product_sold: number;
  };
};

// Custom YAxis Tick Component
const CustomYAxisTick = ({ x, y, payload }: any) => {
  const text =
    payload.value.length > 15
      ? `${payload.value.substring(0, 15)}...`
      : payload.value;
  return (
    <text
      x={x}
      y={y}
      dx={-10}
      dy={4}
      fontSize={12}
      textAnchor="end"
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </text>
  );
};

export default function SalesReport({ sales }: SalesProps) {
  const salesData = [
    { name: "Products Launched", value: sales.product_launched },
    { name: "Ongoing Product", value: sales.ongoing_product },
    { name: "Product Sold", value: sales.product_sold },
  ];

  const barColors = ["#ADFF2F", "#ADFF2F", "#ADFF2F"]; // Bright green for bars

  return (
    <div className="bg-stone-50 shadow-md p-6 rounded-2xl border border-gray-200">
      {/* Header Section */}
      <div className="w-full flex justify-between md:px-6">
        <h2 className="text-lg font-semibold text-center">Sales Report</h2>
        <span className="font-extrabold text-xl">...</span>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={salesData}
          layout="vertical"
          barCategoryGap="30%" // Add spacing between the bars
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }} // Adjust chart padding
        >
          <XAxis
            type="number"
            hide={false}
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={<CustomYAxisTick />} // Use the custom tick component
            width={150}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 8, 8]}>
            {salesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              dy={0}
              fill="#000"
              fontSize={14}
              fontWeight="bold"
              formatter={(value: any) => `${value}`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
