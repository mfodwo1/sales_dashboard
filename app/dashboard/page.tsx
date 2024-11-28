'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type ReportData = {
  update: {
    percentage_change: string;
    date: string;
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
    product_launched: string;
    ongoing_product: string;
    product_sold: string;
  };
  revenue: {
    amount: string;
    currency: string;
    percentage_change: string;
    break_down: { week: number; revenue: string; expense: string }[];
  };
  total_view_perfomance: {
    view_count: string;
    sales: string;
    percentage: string;
    total_count: string;
  };
};

export default function DashboardPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          'https://rb-playground.onrender.com/internal/api/v1/report/summary/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReport(response.data?.data);
      } catch (err) {
        setError('Failed to fetch report. Please try again.');
      }
    };

    if (token) {
      fetchReport();
    } else {
      setError('You are not authenticated. Please log in.');
    }
  }, [token]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!report) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg font-semibold">Update</h2>
        <p>Percentage Change: {report.update.percentage_change}</p>
        <p>Date: {report.update.date}</p>

        <h2 className="text-lg font-semibold mt-4">Net Income</h2>
        <p>Amount: {report.net_income.amount} {report.net_income.currency}</p>
        <p>Change: {report.net_income.percentage_change}</p>

        <h2 className="text-lg font-semibold mt-4">Revenue Breakdown</h2>
        {report.revenue.break_down.map((item, index) => (
          <div key={index} className="mb-2">
            <p>Week {item.week}: Revenue - {item.revenue}, Expense - {item.expense}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
