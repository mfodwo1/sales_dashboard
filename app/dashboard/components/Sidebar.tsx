"use client";

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
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName =
    session?.user?.user.profile.first_name +
      " " +
      session?.user?.user.profile.last_name || "User";
  const userEmail = session?.user?.user.email || "user@example.com";

  const handleLogout = async () => {
    try {
      const refreshToken = session?.user?.refresh;
      const accessToken = session?.user?.access;

      if (!refreshToken || !accessToken) {
        console.error("Missing refresh or access token.");
        signOut();
        return;
      }

      // Log tokens for debugging
      console.log("Refresh Token:", refreshToken);
      console.log("Access Token:", accessToken);

      // Make the logout API request
      await axios.post(
        "https://rb-playground.onrender.com/internal/api/v1/auth/logout/",
        { refresh: refreshToken }, // Send refresh token in the body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add access token in the headers
          },
        }
      );

      // Sign out via NextAuth
      signOut();
    } catch (error) {
      if (error.response) {
        console.error("Logout failed:", error.response.data);
      } else {
        console.error("Logout error:", error.message);
      }
    }
  };

  return (
    <div className="bg-darkGreen text-lightGray h-screen p-4 flex flex-col justify-between">
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
      <div className="relative mt-8">
        {showDropdown && (
          <div className="absolute right-0 bg-white text-red-500 shadow-md rounded-md mt-2 p-2">
            <button
              className="text-sm w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import {
//   FaTh,
//   FaChartBar,
//   FaUserFriends,
//   FaBox,
//   FaEnvelope,
//   FaWallet,
//   FaCog,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { useSession } from "next-auth/react";

// export default function Sidebar() {
//   const { data: session } = useSession();

//   console.log(session?.user.user.profile);

//   const userName =
//     session?.user?.user.profile.first_name +
//       " " +
//       session?.user?.user.profile.last_name || "User";
//   const userEmail = session?.user?.user.email || "user@example.com";

//   return (
//     <div className="bg-darkGreen text-lightGray h-screen p-4 flex flex-col justify-between">
//       <div>
//         <h1 className="text-2xl font-bold mb-8">RB</h1>
//         <ul className="space-y-6">
//           <li className="flex items-center space-x-3">
//             <FaTh />
//             <span>Overview</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <FaChartBar />
//             <span>Statistics</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <FaUserFriends />
//             <span>Customers</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <FaBox />
//             <span>Products</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <FaEnvelope />
//             <span>Messages</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <FaWallet />
//             <span>Wallet</span>
//           </li>
//         </ul>
//         <div className="mt-8 border-t border-white/30 pt-4">
//           <ul className="space-y-6">
//             <li className="flex items-center space-x-3">
//               <FaCog />
//               <span>Settings</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               <FaShieldAlt />
//               <span>Security</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="flex items-center space-x-3 mt-8">
//         <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl font-bold">
//           {userName.charAt(0).toUpperCase()}
//         </div>
//         <div>
//           <p className="text-sm font-medium">{userName}</p>
//           <p className="text-xs">{userEmail}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
