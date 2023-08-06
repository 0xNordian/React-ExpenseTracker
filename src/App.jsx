import { useState } from "react";
import ExpenseCard from "./components/Expenses/ExpenseCard";
import NewExpense from "./components/NewExpense/NewExpense";

const App = () => {
  const [expenses, setExpenses] = useState(() => []);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  }

  return (
    <>
        <NewExpense onAddExpense={addExpenseHandler}/>
        <ExpenseCard expensesArr={expenses}/>
    </>
  )
}

export default App;
