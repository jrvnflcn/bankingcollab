const Transactions = ({ transactions }) => {
  return (
    <div className="transactions box">
      <h2 className="text-center mb-4">Transactions</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="col-4">Name</th>
            <th className="col-4">Action</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) && 
            transactions.slice().reverse().map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.user}</td>
                <td>{transaction.action}</td>
                <td>{transaction.credit}</td>
                <td>{transaction.debit}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;