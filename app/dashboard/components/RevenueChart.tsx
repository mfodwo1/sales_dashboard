import { AiOutlineLineChart } from "react-icons/ai";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RevenueProps = {
  data: { week: number; revenue: string; expense: string }[];
};

export default function RevenueChart({ data }: RevenueProps) {
  const formattedData = data.map((item) => ({
    week: `Week ${item.week}`,
    revenue: parseFloat(item.revenue),
    expense: parseFloat(item.expense),
  }));

  return (
    <div className="bg-stone-50 shadow-md p-6 rounded-2xl border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-600">
        <h2 className="text-lg font-bold text-gray-800">Revenue</h2>
        <div className="flex space-x-4 items-center">
          <div className="flex items-center">
            <span
              className="w-4 h-4 rounded bg-darkGreen mr-2"
              aria-label="Income color"
            ></span>
            <p className="text-sm text-gray-600">Income</p>
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4 rounded bg-lemonGreen mr-2"
              aria-label="Expenses color"
            ></span>
            <p className="text-sm text-gray-600">Expenses</p>
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-gray-800">
          <sup className="pr-2 text-xs">GHS</sup>193,000
        </p>
        <p className="text-sm text-green-500 font-semibold flex justify-center items-center">
          <AiOutlineLineChart />{" "}
          <span className="ml-1">+35% from last month</span>
        </p>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formattedData}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "12px", color: "#888" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "12px", color: "#888" }}
          />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="revenue" fill="#012706" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#9bf32a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
