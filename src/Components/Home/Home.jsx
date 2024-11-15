import React, { useState, useEffect } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal/AddUserModal";
import UserListModal from "./UserListModal/UserListModal";
import MoneyTransferModal from "./MoneyTransferModal/MoneyTransferModal";
import BankTransferModal from "./BankTransferModal/BankTransferModal";
import Transactions from "./Transactions";
import useFetch from "../../useFetch";
import "./Home.css";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserListModal, setShowUserListModal] = useState(false);
  const [showMoneyTransferModal, setShowMoneyTransferModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const { data: transactions, isPending: isTransactionsPending, error: transactionsError } = useFetch("http://localhost:8000/transactions");

  const { data: users, isPending: isUsersPending, error: usersError } = useFetch("http://localhost:8000/users");

  useEffect(() => {
    if (users) {
      const total = users.reduce((acc, user) => acc + parseFloat(user.balance || 0), 0);
      setTotalBalance(total);
    }
  }, [users]);

  return (
    <div className="container-fluid container-xxl">

      <h1 className="display-5 d-flex align-start ms-5 mt-3" id="welcome">
        Welcome User
      </h1>

      <div className="dashboard">
        <div className="balance-card box">
          <div className="balance-amount">${totalBalance.toFixed(2)}</div>
        </div>

        <div className="actions">
          <div className="action-button box" onClick={() => setShowAddUserModal(true)}>
            Add User
          </div>
          <div className="action-button box" onClick={() => setShowUserListModal(true)}>
            User List
          </div>
          <div className="action-button box" onClick={() => setShowMoneyTransferModal(true)}>
            Money Transfer
          </div>
          <div className="action-button box" onClick={() => setShowBankTransferModal(true)}>
            Add Money/Withdraw
          </div>
        </div>

        {isTransactionsPending && <p>Loading transactions...</p>}
        {transactionsError && <p>{transactionsError}</p>}
        
        <Transactions transactions={transactions} />

        <AddUserModal show={showAddUserModal} onClose={() => setShowAddUserModal(false)} />
        <UserListModal users={users} show={showUserListModal} onClose={() => setShowUserListModal(false)} />
        <MoneyTransferModal users={users} show={showMoneyTransferModal} onClose={() => setShowMoneyTransferModal(false)} />
        <BankTransferModal users={users} show={showBankTransferModal} onClose={() => setShowBankTransferModal(false)} />
      </div>
    </div>
  );
};

export default Home;
