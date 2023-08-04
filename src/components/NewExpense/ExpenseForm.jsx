import React, { useState } from 'react'
import styles from './ExpenseForm.module.css'

const ExpenseForm = () => {
    const [title, setTitle] = useState(() => {
        return "";
    });

    const [date, setDate] = useState(() => {
        return "";
    });

    const [expenseAmount, setExpenseAmount] = useState(() => {
        return 0
    });

    const expenseTitleHandler = (event) => {
        setTitle(() => {
            return event.target.value;
        })
    };

    const expenseDateHandler = (event) => {
        setDate(() => {
            return event.target.value;
        })
    };

    const expenseAmountHandler = (event) => {
        setExpenseAmount(() => {
            return event.target.value;
        })
    };

    return (
        //className={styles['form']}
        <form>
            <div className={styles["new-expense__controls"]}>
                <div className={styles["new-expense__control"]}>
                    <input
                        type="text"
                        name="expense-title"
                        placeholder="Expense Title"
                        value={title}
                        onChange={expenseTitleHandler}
                    />
                </div>
                <div className={styles["new-expense__control"]}>
                    <input
                        type="date"
                        name="expense-date"
                        placeholder=""
                        min="2023-01-01"
                        max="2026-12-31"
                        value={date}
                        onChange={expenseDateHandler}
                    />
                </div>
                <div className={styles["new-expense__control"]}>
                    <input
                        type="number"
                        name="expense-amount"
                        placeholder="Amount"
                        min="0.01"
                        step="0.01"
                        value={expenseAmount}
                        onChange={expenseAmountHandler}
                    />
                </div>
            </div>
            <div className={styles["new-expense__actions"]}>
            <button type="submit" className={styles['form-btn']}>Create</button>
            </div>
        </form>
    )
}

export default ExpenseForm