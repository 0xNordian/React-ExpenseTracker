import React from 'react'
import ExpenseForm from './ExpenseForm'
import styles from './NewExpense.module.css'

const NewExpense = (props) => {
    const saveExpenseLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        // console.log("newExpense", expenseData.id)
        // props.deleteExp(expenseData.id)
        props.addExpenseHandler(expenseData);
    };

    return (
        <div className={styles['new-expense']}>
            <ExpenseForm onSavedExpenseData={saveExpenseLiftUp}/>
        </div>
    )
}

export default NewExpense