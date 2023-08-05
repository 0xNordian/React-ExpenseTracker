import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = () => {
    const [userInput, setUserInput] = useState(() => {
        return {
            enteredTitle: '',
            enteredDate: '',
            enteredAmount: ''
        };
    });
    
const [titleError, setTitleError] = useState(false);

    const inputHandler = (id, value) => {
        switch (id) {
            case 'title':
                setUserInput((prevState) => ({ ...prevState, enteredTitle: value }));
                setTitleError(value.length < 3); // Set titleError to true if the title length is less than 3
                break;
            case 'date':
                setUserInput((prevState) => ({ ...prevState, enteredDate: value }));
                break;
            case 'amount':
                setUserInput((prevState) => ({ ...prevState, enteredAmount: value }));
                break;
            default:
                break;
        }
    };

    return (
        <form>
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
                        min='2023-01-01'
                        max='2026-12-31'
                        value={userInput.enteredDate}
                        onChange={(e) => inputHandler('date', e.target.value)}
                    />
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
