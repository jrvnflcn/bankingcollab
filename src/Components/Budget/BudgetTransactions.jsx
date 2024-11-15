const BudgetTransactions = ({transactions}) => {
  
  
  return ( <div className="transactComponent">

    <h2>Budgeting History</h2>
    <div className="transactHeaders">
      <div>Date</div>
      <div>Type</div>
      <div>Previous Amount</div>
      <div>Changed Amount</div>
    </div>
    {transactions.length===0 && <div>No current budget transaction</div>}
    {transactions && transactions.map(trans=>(
      <div key={trans.time} className="budgetTransacts">
        <div>{trans.time}</div>
        <div>{trans.name}</div>
        <div>{trans.previousamount}</div>
        <div>{trans.amount}</div>

      </div>
    ))}
  </div> );
}
 
export default BudgetTransactions;