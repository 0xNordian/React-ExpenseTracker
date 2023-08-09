import { useState } from "react";
import ExpenseCard from "./components/Expenses/ExpenseCard";
import NewExpense from "./components/NewExpense/NewExpense";
import styles from './App.module.css'

const App = () => {
  const [expenses, setExpenses] = useState(() => []);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  }

  const deleteExpenseHandler = (selectedId) => {
    const updatedExpenses = expenses.filter((obj) => obj.id !== selectedId);
    setExpenses(updatedExpenses);
  };
  
  console.log("expenses: ", expenses)

  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <NewExpense addExpenseHandler={addExpenseHandler} />
        <ExpenseCard expensesArr={expenses} deleteExp={deleteExpenseHandler} />
      </div>
    </div>
  )
}

export default App;
