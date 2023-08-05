import React, { useState } from 'react'
import styles from './ExpenseForm.module.css'

const ExpenseForm = () => {
    const [userInput, setUserInput] = useState(() => {
        return {
            enteredTitle: '',
            enteredDate: '',
            enteredAmount: ''
        }
    });

    // const titleChengeHandler = (event) => {
    //     setUserInput((prevState) => {
    //         return {
    //             ...prevState,
    //             enteredTitle: event.target.value,
    //         }
    //     })
    // };

    // const expenseDateHandler = (event) => {
    //     setUserInput((prevState) => { 
    //         return {
    //             ...prevState,
    //             enteredDate: event.target.value,
    //         }
    //     })
    // };

    // const expenseAmountHandler = (event) => {
    //     const value = event.target.value;
    //     if (!isNaN(value)) {
    //         setUserInput((prevState) => {
    //             return {
    //                 ...prevState,
    //                 enteredAmount: Number(value),
    //             }
    //         })
    //     } else {
    //         throw new Error('Input must be of type number')
    //     }
    // };

    const inputHandler = (id, value) => {
        switch(id){
            case "title":
                return setUserInput((prevState) => ({...prevState, enteredTitle: value}));
            case "date":
                return setUserInput((prevState) => ({...prevState, enteredDate: value}));
            case "amount":
                return setUserInput((prevState) => ({...prevState, enteredAmount: value}));
            default:
                return null;
        }
    }

    return (
        <form>
            <div className={styles["new-expense__controls"]}>
                <div className={styles["new-expense__control"]}>
                    <label htmlFor='expense-title'>Title</label>
                    <input
                        type="text"
                        name="expense-title"
                        id="expense-title"
                        placeholder="(E.g: Pizza)"
                        value={userInput.enteredTitle}
                        // onChange={titleChengeHandler}
                        onChange={(e) => inputHandler("title", e.target.value)}
                    />
                </div>
                <div className={styles["new-expense__control"]}>
                    <label htmlFor='expense-date'>Date</label>
                    <input
                        type="date"
                        name="expense-date"
                        id="expense-date"
                        placeholder=""
                        min="2023-01-01"
                        max="2026-12-31"
                        value={userInput.enteredDate}
                        // onChange={expenseDateHandler}
                        onChange={(e) => inputHandler("date", e.target.value)}
                    />
                </div>
                <div className={styles["new-expense__control"]}>
                    <label htmlFor='expense-amount'>Amount</label>
                    <input
                        type="number"
                        name="expense-amount"
                        id="expense-amount"
                        placeholder="Amount"
                        min="0.01"
                        step="0.01"
                        value={userInput.enteredAmount}
                        // onChange={expenseAmountHandler}
                        onChange={(e) => inputHandler("amount", e.target.value)}
                    />
                </div>
            </div>
            <div className={styles["new-expense__actions"]}>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

export default ExpenseForm