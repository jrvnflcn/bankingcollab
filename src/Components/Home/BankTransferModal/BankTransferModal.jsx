import React, { useState, useEffect } from 'react';
import './BankTransferModal.css';

const BankTransferModal = ({ show, onClose, users }) => {
  const [transactionType, setTransactionType] = useState('Add');
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (users && users.length > 0) {
      setSelectedUser(users[0].id); 
    }
  }, [users]);

  const handleTransfer = () => {
    const user = users.find((user) => user.id === selectedUser);
    const transferAmount = parseFloat(amount);

    if (!user || isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please select a valid user and enter a valid amount.');
      return;
    }

    if (transactionType === 'Withdraw' && transferAmount > parseFloat(user.balance)) {
      setError('Insufficient balance for withdrawal.');
      return;
    }

    const newBalance =
      transactionType === 'Add'
        ? parseFloat(user.balance) + transferAmount
        : parseFloat(user.balance) - transferAmount;

    const updatedUser = { ...user, balance: newBalance.toString() };

    fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })
      .then(() => {
        const transaction = {
          user: `${user.fname} ${user.lname}`,
          action: transactionType === 'Add' ? 'Credit' : 'Debit',
          credit: transactionType === 'Add' ? transferAmount : null,
          debit: transactionType === 'Withdraw' ? transferAmount : null,
          description: transactionType === 'Add'
            ? `Deposit of $${transferAmount} to account.`
            : `Withdrawal of $${transferAmount} from account.`,
          date: new Date().toISOString(),
        };

        return fetch('http://localhost:8000/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        });
      })
      .then(() => {
        console.log('Transaction recorded');
        setError(null);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating balance or recording transaction:', error);
        setError('An error occurred. Please try again.');
      });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Deposit / Withdraw</h2>

        {error && <p className="error">{error}</p>}

        <label>Transaction Type</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Add">Add Money</option>
          <option value="Withdraw">Withdraw</option>
        </select>

        <label>User</label>
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

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          required
        />

        <div className="modal-actions">
        <button onClick={onClose}>Cancel</button>
          <button onClick={handleTransfer}>Submit</button>
          
        </div>
      </div>
    </div>
  );
};

export default BankTransferModal;
