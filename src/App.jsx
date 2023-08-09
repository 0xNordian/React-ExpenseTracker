import { useState } from "react";
import ExpenseCard from "./components/Expenses/ExpenseCard";
import NewExpense from "./components/NewExpense/NewExpense";
import styles from './App.module.css'

const App = () => {
  const [expenses, setExpenses] = useState(() => []);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <NewExpense addExpenseHandler={addExpenseHandler}/>
        <ExpenseCard expensesArr={expenses} />
      </div>
    </div>
  )
}

export default App;
