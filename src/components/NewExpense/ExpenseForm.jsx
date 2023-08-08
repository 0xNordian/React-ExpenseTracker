import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = (props) => {
    const todayDate = new Date();
    const maxDate = formatDate(todayDate); // Format today's date with leading zeros
    // console.log("maxDate: ", maxDate)
    const [titleError, setTitleError] = useState(false);
    const [id, setId] = useState([1])
    const [isFuture, setIsFuture] = useState(false);

    //! USER INPUT STATE
    const [userInput, setUserInput] = useState(() => {
        return {
            id: '',
            enteredTitle: '',
            enteredDate: maxDate,
            enteredAmount: ''
        };
    });

    //! INPUT HANDLER FUNCTION
    const inputHandler = (id, value) => {
        switch (id) {
            case 'title':
                setUserInput((prevState) => ({ ...prevState, enteredTitle: value }));
                setTitleError(value.length < 3); // Set titleError to true if the title length is less than 3
                break;
            case 'date':
                setUserInput((prevState) => ({ ...prevState, enteredDate: value }));
                setIsFuture(value > todayDate);
                break;
            case 'amount':
                setUserInput((prevState) => ({ ...prevState, enteredAmount: value }));
                break;
            default:
                break;
        }
    };

    //! SUBMIT FORM FUNCTION
    const submitHandler = (e) => {
        e.preventDefault();

        setId((prevId) => [...prevId, prevId.length + 1])
        const newExpenseDate = new Date(userInput.enteredDate)
        const expenseData = {
            id: `e${id[id.length - 1]}`,
            title: userInput.enteredTitle,
            amount: userInput.enteredAmount,
            // date: newExpenseDate.toLocaleDateString()
            date: newExpenseDate
        };
        console.log("expenseData: ", expenseData)
        //* LIFT SUBMITTED DATA
        props.onSavedExpenseData(expenseData);

        //* RESTART FORM
        setUserInput({
            id: "",
            enteredTitle: "",
            enteredDate: maxDate,
            enteredAmount: "",
        });
    };

    //! DATE FORMAT FUNCTION
    function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;

        return `${year}-${formattedMonth}-${formattedDay}`;
        // return `${formattedDay}-${formattedMonth}-${year}`;
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={styles['new-expense__controls']}>
                <div className={styles['new-expense__control']}>
                    <label htmlFor='expense-title'>Title</label>
                    <input
                        className={titleError ? styles['title-alert'] : ''}
                        type='text'
                        name='expense-title'
                        id='expense-title'
                        placeholder='(E.g: Pizza)'
                        value={userInput.enteredTitle}
                        onChange={(e) => inputHandler('title', e.target.value)}
                    />
                    {titleError && <p className={styles['error-message']}>Title must have at least three characters</p>}
                </div>
                <div className={styles['new-expense__control']}>
                    <label htmlFor='expense-date'>Date</label>
                    <input
                        type='date'
                        name='expense-date'
                        id='expense-date'
                        placeholder=''
                        min='2020-01-01'
                        max={maxDate}
                        value={userInput.enteredDate || maxDate}
                        onChange={(e) => inputHandler('date', e.target.value)}
                    />
                    {isFuture && <p className={styles['error-message']}>Date cannot be in the future.</p>}
                </div>
                <div className={styles['new-expense__control']}>
                    <label htmlFor='expense-amount'>Amount</label>
                    <input
                        type='number'
                        name='expense-amount'
                        id='expense-amount'
                        placeholder='Amount'
                        min='0.01'
                        step='0.01'
                        value={userInput.enteredAmount}
                        onChange={(e) => inputHandler('amount', e.target.value)}
                    />
                </div>
            </div>
            <div className={styles['new-expense__actions']}>
                <button type='submit'>Create</button>
            </div>
        </form>
    );
};

export default ExpenseForm;