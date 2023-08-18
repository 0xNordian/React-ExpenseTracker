import { useState, useEffect } from "react";
import ExpenseCard from "./components/Expenses/ExpenseCard";
import TableView from "./components/TableView/TableView";
// import data from "./components/TableView/data.js" 
import styles from './App.module.css'

const App = () => {
  const [expenses, setExpenses] = useState(() => []);

  const addExpenseHandler = (expense) => {
  setExpenses((prevExpenses) => {
    const updatedExpenses = [expense, ...prevExpenses];
    // data.updateExpData(updatedExpenses);
    return updatedExpenses;
  });
}

const deleteExpenseHandler = (selectedId) => {
  setExpenses((prevExpenses) => {
    const updatedExpenses = prevExpenses.filter((obj) => obj.id !== selectedId);
    // data.updateExpData(updatedExpenses);
    return updatedExpenses;
  });
};

  return (
    <div className={`${styles['main-container']}`}>
      <div className="flex gap-2 mt-16">
        <h1 className="text-[#99ddc8] text-[2rem]">TrakEx</h1>
        <img className="w-[50px]" src="/money-wings.gif" />
      </div>
      <div className={`${styles['container']}`}>
        <ExpenseCard expensesArr={expenses} deleteExp={deleteExpenseHandler} addExpenseHandler={addExpenseHandler} />
        {/* <TableView tableExpData={data.expData} columns={data.columns} /> */}
      </div>
    </div>
  )
}

export default App;
