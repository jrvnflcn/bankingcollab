import React, { useState } from 'react';
import './MoneyTransferModal.css';

const MoneyTransferModal = ({ show, onClose, users }) => {
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleTransfer = () => {
    if (!senderId || !recipientId || !amount || senderId === recipientId) {
      setError("Please select both accounts and enter a valid amount.");
      return;
    }
  
    const sender = users.find(user => user.id === senderId);
    const recipient = users.find(user => user.id === recipientId);
    const transferAmount = parseFloat(amount);
  
    if (sender && recipient && parseFloat(sender.balance) >= transferAmount) {
      fetch(`http://localhost:8000/users/${senderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance: parseFloat(sender.balance) - transferAmount })
      });
  
      fetch(`http://localhost:8000/users/${recipientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance: parseFloat(recipient.balance) + transferAmount })
      });
  
      const transaction = {
        user: `${sender.fname} ${sender.lname}`,
        action: 'Money Transfer',
        amount: transferAmount,
        id: Date.now().toString() 
      };
      fetch('http://localhost:8000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });
  
      setError(null);
      onClose(); 
    } else {
      setError("Insufficient balance or invalid transfer details.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Money Transfer</h2>
        
        <label>
          Sender:
          <select value={senderId} onChange={(e) => setSenderId(e.target.value)}>
            <option value="">Select Sender</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.fname} {user.lname} - Balance: ${user.balance}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Recipient:
          <select value={recipientId} onChange={(e) => setRecipientId(e.target.value)}>
            <option value="">Select Recipient</option>
            {users.map(user => (
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
            min="1"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button onClick={handleTransfer}>Transfer</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferModal;