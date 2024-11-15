import React from "react";
import "./UserListModal.css";

const UserListModal = ({ show, onClose, users }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User List</h2>

        {Array.isArray(users) && users.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Account</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.account}</td>
                  <td>{user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
