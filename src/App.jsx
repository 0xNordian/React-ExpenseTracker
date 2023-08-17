import { useState } from "react";
import ExpenseCard from "./components/Expenses/ExpenseCard";
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

  return (
    <div className={styles['main-container']}>
      <div className="flex gap-2">
        <h1 className="text-[#99ddc8] text-[2rem]">TrakEx</h1>
        <img className="w-[50px]" src="/money-wings.gif" />
      </div>
      <div className={`${styles['container']}`}>
        <ExpenseCard expensesArr={expenses} deleteExp={deleteExpenseHandler} addExpenseHandler={addExpenseHandler} />
      </div>
    </div>
  )
}

export default App;
