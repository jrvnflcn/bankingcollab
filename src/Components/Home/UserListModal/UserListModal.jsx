import React, { useState } from "react";
import "./UserListModal.css";

const UserListModal = ({ show, onClose, users, onUsersChange }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (!show) return null;

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDelete = () => {
    const usersToDelete = users.filter((user) => selectedUsers.includes(user.id));

    Promise.all(
      usersToDelete.map((user) =>
        fetch(`http://localhost:8000/users/${user.id}`, {
          method: "DELETE",
        }).then(() => {

          const transaction = {
            user: `${user.fname} ${user.lname}`,
            action: "Account Deleted",
            debit: user.balance,
            description: `Account for ${user.fname} ${user.lname} was deleted`,
            date: new Date().toISOString(),
          };
          return fetch("http://localhost:8000/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
          });
        })
      )
    )
      .then(() => {
        const remainingUsers = users.filter(
          (user) => !selectedUsers.includes(user.id)
        );
        onUsersChange(remainingUsers);
        setSelectedUsers([]);
      })
      .catch((error) =>
        console.error("Error deleting user or adding transaction:", error)
      );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User List</h2>

        {Array.isArray(users) && users.length > 0 ? (
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Account</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </td>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.account}</td>
                    <td>{user.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}

        <div className="modal-actions">
          {selectedUsers.length > 0 && (
            <button className="delete-button" onClick={handleDelete}>
              Delete Selected
            </button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
