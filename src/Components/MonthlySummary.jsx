import React from "react";
import dayjs from "dayjs";
import './MonthlySummary.css'

const MonthlySummary = ({ entries }) => {
  const summary = {};

  entries.forEach((entry) => {
    const month = dayjs(entry.date).format("YYYY-MM"); // e.g., "2025-04"
    const key = `${entry.name}-${month}`;
    summary[key] = (summary[key] || 0) + entry.amount;
  });

  const grouped = Object.entries(summary).map(([key, total]) => {
    const [name, month] = key.split("-");
    return { name, month, total };
  });

  return (
    <div className="monthly-summary">
      <h2 className="text-xl font-bold mb-2">Monthly Summary</h2>
      {grouped.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.month}</td>
                <td className="border p-2">₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MonthlySummary;
