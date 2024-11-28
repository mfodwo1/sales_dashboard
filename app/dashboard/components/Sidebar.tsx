export default function Sidebar() {
  return (
    <div className="w-64 bg-green-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">RB</h1>
      <ul className="space-y-4">
        <li className="font-semibold">Overview</li>
        <li>Statistics</li>
        <li>Customers</li>
        <li>Products</li>
        <li>Messages</li>
        <li>Wallet</li>
        <li>Settings</li>
        <li>Security</li>
      </ul>
    </div>
  );
}
