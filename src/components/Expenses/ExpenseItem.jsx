import styles from './ExpenseItem.module.css'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'
import { useState } from 'react';

const ExpenseItem = (props) => {
    const expenseData = props.expense;
    const expenseDate = props.expense.date;

    const [title, setTitle] = useState(() => expenseData.title);
    const [isEditing, setIsEditing] = useState(() => {
        return false;
    });

    const handleTitleInputChange = (event) => {
        setTitle(() => event.target.value);
    }

    const handleTitleChange = () => {
        setIsEditing(() => true);
    }

    const handleTitleSave = () => {
        setIsEditing(() => false);
    }

    const isDeletedHandler = () => {
        console.log("expenseData.id: ", expenseData.id)
        props.deleteExp(expenseData.id);
    }

    return (
        <Card className={styles['expense-item']}>
            <ExpenseDate dates={expenseDate} />
            <div className={styles['expense-item__description']}>
                {isEditing ? (
                    <input
                        className={styles['expense_item__title-input']}
                        type="text"
                        value={title}
                        onChange={handleTitleInputChange}
                        onKeyDown={(event) => { 'Enter' === event.key && handleTitleSave(); }}
                        onBlur={handleTitleSave}
                        autoFocus // Automatically focus on the input when it becomes visible
                    />
                ) : (
                    <h2 className={styles['expense_item__title']}>
                        {title}
                    </h2>
                )}
                <div className={styles['expense-item__price']}>€{expenseData.amount}</div>
                <div className={styles['btns']}>
                    <button onClick={handleTitleChange}>✏️</button>
                    <button onClick={isDeletedHandler}>🗑️</button>
                </div>
            </div>
        </Card>
    )
}

export default ExpenseItem; 