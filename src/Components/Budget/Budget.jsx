import { useState } from 'react';
import data from './budgetlist.json'
import Edit from './EditBudget';
import './budget.css'
import BudgetTransactions from './BudgetTransactions';


const Budget = () => {

  const [expenses, setExpenses] = useState(data.expenses)
  const [budget, setBudget] = useState(data.budget)
  const [transactions, setTransactions] = useState([]);


const getDate = ()=>{

  const date = new Date();

  const time = date.toISOString();
  const splat = time.split("T");
  const hours = splat[1].split(".")[0];
  const newTime = `${hours} ${splat[0]}`
 
  return newTime;
}
  const editExpenses = (expenseType, amounts)=>{
    let newArray = [...expenses]
    let index = expenses.findIndex(expense=>(expense.name===expenseType));

    const obj={

      "name":expenseType,
      "previousamount": (newArray[index] ? newArray[index].amount : "0"),
      "amount": Number(amounts),
      "time": getDate()
    }
   

    if(index>=0){
      newArray[index].amount = Number(amounts);
      setExpenses(newArray);
      setTransactions(prev=> [...prev, obj])
    }
    else{
      setExpenses([...newArray, obj]);
      setTransactions(prev=>[...prev, obj])
    }
  }

  const deleteExpense = (name)=>{
    let newArray = expenses.filter(expense=>(expense.name!==name));
    setExpenses(newArray);

    let found = expenses.find(expense=>(expense.name===name));

    const obj={

      "name":name,
      "previousamount": found.amount,
      "amount": "0 (DELETED)",
      "time": getDate()
    }
    setTransactions(prev=>[...prev, obj])
  
  }



  return ( <div>
    <div  className="budgetPage">
    <h2>Custom Budgeting Simulator</h2>
    <div className="budgetContainer">
      <div className="budgetHead">
      <div>Initial Budget</div><div className="right-align">${budget}</div>
      </div>
      {expenses && expenses.map(expense=>(<div key={expense.name} className="expenses">
        
        <div><i className="fa-solid fa-trash" onClick={()=>deleteExpense(expense.name)}></i>{expense.name}</div><div className="right-align">{expense.amount}</div>
        </div>))}
      <div className="budgetTotal">
        <div>Net Budget</div>
        <div className="right-align">${budget-(expenses.reduce((acc, el)=>{return acc+el.amount}, 0))}</div>
      </div> 
    </div>
    <div className='editContainer'>
      <Edit  editExpenses={editExpenses} budget={budget} expenses={expenses} setBudget={setBudget} setTransactions={setTransactions}/>
    </div>
    </div>

        <BudgetTransactions transactions={transactions} />
  
  </div> );
}
 
export default Budget;