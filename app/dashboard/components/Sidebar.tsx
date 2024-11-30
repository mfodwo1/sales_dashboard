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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useState } from "react";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName =
    session?.user?.firstName + " " + session?.user?.lastName || "User";
  const userEmail = session?.user?.email || "user@example.com";

  const handleLogout = async () => {
    try {
      const refreshToken = session?.user?.refreshToken;
      const accessToken = session?.user?.accessToken;

      if (!refreshToken || !accessToken) {
        console.error("Missing refresh or access token.");
        signOut();
        return;
      }

      await axios.post(
        "https://rb-playground.onrender.com/internal/api/v1/auth/logout/",
        { refresh: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      signOut();
    } catch (error: unknown) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      <div
        className={`fixed top-0 left-0 h-screen bg-darkGreen text-lightGray p-4 flex flex-col justify-between z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div>
          <div className="flex justify-between items-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold">RB</h1>
            <FaTimes
              className="text-lightGray cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
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
    </>
  );
}
