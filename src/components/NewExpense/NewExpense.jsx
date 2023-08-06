import React from 'react'
import ExpenseForm from './ExpenseForm'
import styles from './NewExpense.module.css'

const NewExpense = (props) => {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        // console.log("NewEspense Data: ", expenseData)
        props.onAddExpense(expenseData);
    };



    return (
        <div className={styles['new-expense']}>
            <ExpenseForm onSavedExpenseData={saveExpenseDataHandler}/>
        </div>
    )
}

export default NewExpense