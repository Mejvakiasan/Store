import React, { useState } from "react";
import './CustomerSummary.css';

const CustomerSummary = ({ entries }) => {
  const customers = {};

  entries.forEach((entry) => {
    if (!customers[entry.name]) {
      customers[entry.name] = [];
    }
    customers[entry.name].push(entry);
  });

  const [openCustomers, setOpenCustomers] = useState({});

  const toggleCustomer = (name) => {
    setOpenCustomers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        Customer-wise Summary
      </h2>
      {Object.entries(customers).map(([name, customerEntries]) => {
        const total = customerEntries.reduce((sum, e) => sum + e.amount, 0);
        const isOpen = openCustomers[name];

        return (
          <div
            key={name}
            className="border border-gray-300 rounded-xl bg-white shadow-md p-4 mb-4 transition-all hover:shadow-lg"
          >
            <button
              onClick={() => toggleCustomer(name)}
              className="text-left w-full flex justify-between items-center text-lg font-semibold text-blue-700 hover:text-blue-900"
            >
              <span>{isOpen ? "▼" : "▶"} {name} — ₹{total.toFixed(2)}</span>
            </button>

            {isOpen && (
              <ul className="list-disc list-inside mt-3 pl-2 text-gray-700 text-sm space-y-1">
                {customerEntries.map((entry, idx) => (
                  <li key={idx}>
                    ₹{entry.amount} on {entry.date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomerSummary;
