import React from 'react'
import ExpenseForm from './ExpenseForm'
import styles from './NewExpense.module.css'

const NewExpense = (props) => {
    const saveExpenseDataHandlerLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        props.onAddExpense(expenseData);
    };

    return (
        <div className={styles['new-expense']}>
            <ExpenseForm onSavedExpenseData={saveExpenseDataHandlerLiftUp}/>
        </div>
    )
}

export default NewExpense