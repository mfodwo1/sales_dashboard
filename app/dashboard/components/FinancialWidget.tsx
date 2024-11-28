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
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">
        {currency} {amount}
      </p>
      <p
        className={`text-sm ${
          percentageChange.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {percentageChange}
      </p>
    </div>
  );
}
