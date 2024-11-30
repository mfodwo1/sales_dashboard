"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTh,
  FaChartBar,
  FaUserFriends,
  FaBox,
  FaEnvelope,
  FaWallet,
  FaCog,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { data: session } = useSession();

  const pathname = usePathname();
  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <FaTh className="ml-4 mr-2" />,
    },
    {
      label: "Statistics",
      href: "#",
      icon: <FaChartBar className="ml-4 mr-2" />,
    },
    {
      label: "Customers",
      href: "#",
      icon: <FaUserFriends className="ml-4 mr-2" />,
    },
    { label: "Products", href: "#", icon: <FaBox className="ml-4 mr-2" /> },
    {
      label: "Messages",
      href: "#",
      icon: <FaEnvelope className="ml-4 mr-2" />,
    },
    { label: "Wallet", href: "#", icon: <FaWallet className="ml-4 mr-2" /> },
  ];

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
        className={`fixed top-0 left-0 h-screen bg-darkGreen text-lightGray py-4 pr-4 flex flex-col justify-between z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div>
          <div className="md:flex justify-between items-center mb-4 ml-6">
            <h1 className="text-2xl font-bold text-center">RB</h1>
            <FaTimes
              className="text-lightGray cursor-pointer md:hidden"
              onClick={toggleSidebar}
            />
          </div>
          <h1 className="text-lg font-bold mb-4 ml-4 text-white">Menu</h1>
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li
                key={item.href}
                className={`group  flex items-center relative ${
                  pathname === item.href ? "text-white" : "text-lightGray"
                }`}
              >
                {pathname === item.href && (
                  <span className="absolute top-0 bottom-0 left-0 w-1 rounded bg-lime-400 transition-opacity"></span>
                )}
                <Link href={item.href} className="flex items-center w-full">
                  <span
                    className={`${
                      pathname === item.href
                        ? "text-lime-400"
                        : "group-hover:text-lime-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`${
                      pathname === item.href
                        ? "text-white"
                        : "group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-white/30 pt-4">
            <ul className="space-y-6">
              <li className="group flex items-center space-x-3">
                <FaCog className="ml-4 text-lightGray group-hover:text-lime-400/55" />
                <span className="group-hover:text-white">Settings</span>
              </li>
              <li className="group flex items-center space-x-3">
                <FaShieldAlt className="ml-4 text-lightGray group-hover:text-lime-400/55" />
                <span className="group-hover:text-white">Security</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative mt-6 pt-4 border-t border-white/30">
          <div className="flex">
            <div className="flex items-center space-x-3 cursor-pointer col-span-3 pr-2">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs truncate" title={userEmail}>
                  {userEmail.length > 20
                    ? `${userEmail.slice(0, 20)}...`
                    : userEmail}
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <HiArrowRightOnRectangle
                size={30}
                className="text-lightGray"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
