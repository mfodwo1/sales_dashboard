import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type TotalViewPerformanceProps = {
  performance?: {
    total_count: string;
    view_count: string;
    sales: string;
    percentage: string;
  };
};

export default function TotalViewPerformance({ performance }: TotalViewPerformanceProps) {
  const data = performance
    ? [
        { name: 'Total Count', value: parseFloat(performance.total_count || '0') },
        { name: 'View Count', value: parseFloat(performance.view_count || '0') },
        { name: 'Sales', value: parseFloat(performance.sales || '0') },
        { name: 'Percentage', value: parseFloat(performance.percentage || '0') },
      ]
    : [
        { name: 'Total Count', value: 0 },
        { name: 'View Count', value: 0 },
        { name: 'Sales', value: 0 },
        { name: 'Percentage', value: 0 },
      ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Total View Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-500">
        Here are some tips on how to improve your score.
      </p>
      <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
        Guide Views
      </button>
    </div>
  );
}
