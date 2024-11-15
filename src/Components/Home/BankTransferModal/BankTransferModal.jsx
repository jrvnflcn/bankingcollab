import React, { useState, useEffect } from 'react';
import './BankTransferModal.css';

const BankTransferModal = ({ show, onClose, users }) => {
  const [transactionType, setTransactionType] = useState('Add');
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (users && users.length > 0) {
      setSelectedUser(users[0].id); 
    }
  }, [users]);

  const handleTransfer = () => {
    const user = users.find((user) => user.id === selectedUser);
    const newBalance =
      transactionType === 'Add'
        ? parseFloat(user.balance) + parseFloat(amount)
        : parseFloat(user.balance) - parseFloat(amount);

    const updatedUser = { ...user, balance: newBalance.toString() };

    fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })
      .then(() => {
        const newTransaction = {
          user: `${user.fname} ${user.lname}`,
          action: `${transactionType} Money`,
          amount: amount,
          id: Date.now().toString(),
        };

        fetch('http://localhost:8000/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTransaction),
        }).then(() => {
          console.log('Transaction recorded');
          onClose();
        });
      })
      .catch((error) => console.error('Error updating balance:', error));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Bank Transfer</h2>

        <label>
          Transaction Type:
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="Add">Add Money</option>
            <option value="Withdraw">Withdraw</option>
          </select>
        </label>

        <label>
          User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fname} {user.lname}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button onClick={handleTransfer}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BankTransferModal;
