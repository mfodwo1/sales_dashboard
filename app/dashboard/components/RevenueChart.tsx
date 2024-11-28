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
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4CAF50" />
          <Bar dataKey="expense" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
