import {
  FaTh,
  FaChartBar,
  FaUserFriends,
  FaBox,
  FaEnvelope,
  FaWallet,
  FaCog,
  FaShieldAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-darkGreen text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">RB</h1>
        <ul className="space-y-6">
          <li className="flex items-center space-x-3">
            <FaTh />
            <span>Overview</span>
          </li>
          <li className="flex items-center space-x-3">
            <FaChartBar />
            <span>Statistics</span>
          </li>
          <li className="flex items-center space-x-3">
            <FaUserFriends />
            <span>Customers</span>
          </li>
          <li className="flex items-center space-x-3">
            <FaBox />
            <span>Products</span>
          </li>
          <li className="flex items-center space-x-3">
            <FaEnvelope />
            <span>Messages</span>
          </li>
          <li className="flex items-center space-x-3">
            <FaWallet />
            <span>Wallet</span>
          </li>
        </ul>
        <div className="mt-8 border-t border-white/30 pt-4">
          <ul className="space-y-6">
            <li className="flex items-center space-x-3">
              <FaCog />
              <span>Settings</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaShieldAlt />
              <span>Security</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-8">
        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl font-bold">
          F
        </div>
        <div>
          <p className="text-sm font-medium">Fandaww Punx</p>
          <p className="text-xs">fandaww6@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

// import { FaThLarge } from "react-icons/fa";

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-green-900 text-white p-4">
//       <h1 className="text-2xl font-bold mb-6">RB</h1>
//       <ul className="space-y-4">
//         <li className="flex items-center space-x-3 font-semibold">
//           <FaThLarge />
//           <span>Overview</span>
//         </li>
//         <li className="flex items-center space-x-3 font-semibold"> Statistics</li>
//         <li className="flex items-center space-x-3 font-semibold">Customers</li>
//         <li className="flex items-center space-x-3 font-semibold">Products</li>
//         <li className="flex items-center space-x-3 font-semibold">Messages</li>
//         <li className="flex items-center space-x-3 font-semibold">Wallet</li>
//         <li className="flex items-center space-x-3 font-semibold">Settings</li>
//         <li className="flex items-center space-x-3 font-semibold">Security</li>
//       </ul>
//     </div>
//   );
// }
