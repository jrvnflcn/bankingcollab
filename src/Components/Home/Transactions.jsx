const Transactions = ({ transactions }) => {
    return (
      <div className="transactions box">
        <h2 className="text-center mb-4">Transactions</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>

            {Array.isArray(transactions) && transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.user}</td>
                <td>{transaction.action}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Transactions;
  