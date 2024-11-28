type SalesProps = {
  sales: {
    product_launched: number;
    ongoing_product: number;
    product_sold: number;
  };
};

export default function SalesReport({ sales }: SalesProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold">Sales Report</h2>
      <p>Products Launched: {sales.product_launched}</p>
      <p>Ongoing Products: {sales.ongoing_product}</p>
      <p>Products Sold: {sales.product_sold}</p>
    </div>
  );
}
