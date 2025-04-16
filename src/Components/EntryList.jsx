import React, { useState } from "react";
import './EntryList.css';

const EntryList = ({ entries, onDelete, onEdit }) => {
  const [showAll, setShowAll] = useState(false);

  // Sort entries by date (latest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const visibleEntries = showAll ? sortedEntries : sortedEntries.slice(0, 5);

  return (
    <div className="entry-list-wrapper">
      <div className="entry-list mt-6">
        <h2 className="text-xl font-semibold mb-3">Recent Entries</h2>

        {visibleEntries.map((entry, idx) => {
          // Find the original index in the full `entries` array
          const originalIndex = entries.findIndex(
            (e) =>
              e.name === entry.name &&
              e.amount === entry.amount &&
              e.date === entry.date
          );

          return (
            <div
              key={idx}
              className="card p-3 mb-3 border rounded shadow-sm"
            >
              <div className="font-medium">
                {entry.name} — ₹{entry.amount}
              </div>
              <div className="text-sm text-gray-500">{entry.date}</div>
              <div className="mt-2" style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => onEdit(originalIndex)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(originalIndex)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {entries.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="theme-toggle"
            >
              {showAll ? "▲ Show Less" : "▼ Show All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryList;
