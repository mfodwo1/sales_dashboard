import { PiChartLineDownLight, PiChartLineUpLight } from "react-icons/pi";

type FinancialProps = {
  title: string;
  amount: string;
  currency: string;
  percentageChange: string;
};

export default function FinancialWidget({
  title,
  amount,
  currency,
  percentageChange,
}: FinancialProps) {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-400 flex flex-col items-center justify-center space-y-4">
      <div className="w-full flex justify-between md:px-6">
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <span className="font-extrabold text-xl">...</span>
      </div>
      <p className="text-2xl font-bold text-center">
        <sup className="text-xs">{currency}</sup> {amount}
      </p>
      <p
        className={`text-sm flex items-center space-x-2 ${
          percentageChange.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {percentageChange.startsWith("-") ? (
          <PiChartLineDownLight />
        ) : (
          <PiChartLineUpLight />
        )}
        <span>{percentageChange}</span>
        <span className="text-gray-800">from last month</span>
      </p>
    </div>
  );
}
