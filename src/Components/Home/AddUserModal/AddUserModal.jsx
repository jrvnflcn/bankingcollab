import React, { useState } from "react";
import "./AddUserModal.css";
import { useNavigate } from "react-router-dom";

const AddUserModal = ({ show, onClose, onSave }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [account, setAccount] = useState("Savings");
  const [balance, setBalance] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const user = { fname, lname, account, balance: parseFloat(balance) };

    setIsPending(true);
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("New user added");

        const transaction = {
          action: "Initial Deposit",
          user: `${fname} ${lname}`, 
          accountType: account,
          credit: parseFloat(balance),
          description: `Initial deposit for ${fname} ${lname}`,
          date: new Date().toISOString(),
        };

        return fetch("http://localhost:8000/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        });
      })
      .then(() => {
        console.log("Transaction recorded");
        setIsPending(false);
        onClose();
        
      })
      .catch((error) => {
        console.error("Error adding user or recording transaction:", error);
        setIsPending(false);
      });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="mb-2">
          <label>First Name:</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />

          <label>Last Name:</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />

          <label>Account Type:</label>
          <select
            name="AccountType"
            id="Accounts"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <option value="Checking">Checking Account</option>
            <option value="Savings">Savings Account</option>
          </select>

          <label>Initial Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />

          <div className="modal-actions">
          <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
