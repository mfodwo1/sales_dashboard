"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import UpdateWidget from "./components/UpdateWidget";
import FinancialWidget from "./components/FinancialWidget";
import SalesReport from "./components/SalesReport";
import RevenueChart from "./components/RevenueChart";
import TotalViewPerformance from "./components/TotalViewPerformance";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import HeaderInfo from "./components/HeaderInfo";
import LevelUpSales from "./components/LevelUpSales";

type ReportData = {
  update: {
    percentage_change: string;
    date: string;
    message: string;
  };
  net_income: {
    amount: string;
    currency: string;
    percentage_change: string;
  };
  total_return: {
    amount: string;
    currency: string;
    percentage_change: string;
  };
  sales_report: {
    product_launched: number;
    ongoing_product: number;
    product_sold: number;
  };
  revenue: {
    break_down: { week: number; revenue: string; expense: string }[];
  };
  total_view_performance: {
    total_count: string;
    view_count: string;
    sales: string;
    percentage: string;
  };
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          "https://rb-playground.onrender.com/internal/api/v1/report/summary/",
          {
            headers: {
              Authorization: `Bearer ${session?.user?.access}`,
            },
          }
        );
        setReport(response.data?.data as ReportData);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to fetch report. Please try again.");
      }
    };

    if (session?.user?.access) {
      fetchReport();
    }
  }, [session]);

  if (error) return <ErrorMessage message={error} />;
  if (!report) return <LoadingMessage />;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b-2 px-6 py-3">
          <Header title="Sales Admin" />
        </div>

        <div className="px-6 pb-6">
          {/* Dashboard Header Information */}
          <HeaderInfo />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Widgets */}
            <div className="col-span-3">
              {/* Update Widget */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <UpdateWidget update={report.update} />
                <FinancialWidget
                  title="Net Income"
                  amount={report.net_income.amount}
                  currency={report.net_income.currency}
                  percentageChange={report.net_income.percentage_change}
                />
                <FinancialWidget
                  title="Total Return"
                  amount={report.total_return.amount}
                  currency={report.total_return.currency}
                  percentageChange={report.total_return.percentage_change}
                />
              </div>

              {/* Sales and Revenue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <SalesReport sales={report.sales_report} />
                <RevenueChart data={report.revenue.break_down} />
              </div>
            </div>

            {/* Right Side */}
            <div className="col-span-1 space-y-4">
              <TotalViewPerformance
                performance={report.total_view_performance}
              />
              <LevelUpSales />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
