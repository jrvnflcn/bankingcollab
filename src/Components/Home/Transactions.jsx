const Transactions = ({ transactions, users }) => {
  return (
    <div className="transactions box">
      <h2 className="text-center mb-4">Transactions</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="col-2">Transaction ID</th>
            <th className="col-3">Name</th>
            <th className="col-3">Action</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) && 
            transactions.slice().reverse().map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
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

const creditTransaction = {
  user: `${recipient.fname} ${recipient.lname}`,
  action: 'Credit',
  credit: transferAmount,
  debit: null,
  description :`Transfer from ${sender.fname} ${sender.lname}`,
  date: new Date().toISOString(),
};

fetch('http://localhost:8000/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(creditTransaction),
};)

  setError (null);
  onclose();
} else {
  setError ("Insufficient balance or invalid transfer details.)