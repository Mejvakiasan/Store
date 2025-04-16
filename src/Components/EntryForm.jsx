import React, { useState, useEffect } from "react";
import './EntryForm.css';

const EntryForm = ({ onSave, initialData }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // When initialData changes (for editing), update the form fields
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAmount(initialData.amount || "");
      setDate(initialData.date || "");
    } else {
      setName("");
      setAmount("");
      setDate("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;
    onSave({ name, amount: parseFloat(amount), date });
    setName("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Customer name, வாடிக்கையாளர் பெயர்"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <input
        type="number"
        placeholder="Amount, தொகை"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1">
        {initialData ? "Update" : "சேர்"}
      </button>
    </form>
  );
};

export default EntryForm;
