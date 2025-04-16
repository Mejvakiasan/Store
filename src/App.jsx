import React, { useState, useEffect } from "react";
import EntryForm from "./Components/EntryForm";
import EntryList from "./components/EntryList";
import MonthlySummary from "./components/MonthlySummary";
import CustomerSummary from "./Components/CustomerSummary";
import "./App.css";




const App = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addOrUpdateEntry = (entry) => {
    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = entry;
      setEntries(updated);
      setEditingIndex(null);
    } else {
      setEntries([...entries, entry]);
    }
  };

  const deleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const editEntry = (index) => {
    setEditingIndex(index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMonthChange = (e) => {
    setFilterMonth(e.target.value); // format: "YYYY-MM"
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesName = entry.name.toLowerCase().includes(searchTerm);
    const matchesMonth = filterMonth
      ? entry.date.startsWith(filterMonth)
      : true;
    return matchesName && matchesMonth;
  });

  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold mb-4">Accounts Tracker</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-2 py-1"
        />
        <input
          type="month"
          value={filterMonth}
          onChange={handleMonthChange}
          className="border px-2 py-1"
        />
      </div>

      <EntryForm
        onSave={addOrUpdateEntry}
        initialData={editingIndex !== null ? entries[editingIndex] : null}
      />
      <EntryList
        entries={filteredEntries}
        onDelete={deleteEntry}
        onEdit={editEntry}
      />
      <MonthlySummary entries={filteredEntries} />
      <CustomerSummary entries={filteredEntries} />

    </div>
  );
};

export default App;
