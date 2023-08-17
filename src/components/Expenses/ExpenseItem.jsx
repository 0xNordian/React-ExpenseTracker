import styles from './ExpenseItem.module.css'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'
import { useState } from 'react';
import { Chip } from "@nextui-org/react";

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
        // console.log("expenseData.id: ", expenseData.id)
        props.deleteExp(expenseData.id);
    }

    // console.log('isEditing:', isEditing);
    // console.log('title:', title);
    // console.log('displayCategory:', expenseData.displayCategory);


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
                    <div className="flex flex-col gap-1 justify-start items-start w-[80%] ml-2">
                        <h2 className={styles['expense_item__title']}>
                            {title}
                        </h2>
                        <Chip className="text-white text-xs scale-[85%]" color="success" variant="dot">{expenseData.displayCategory}</Chip>
                    </div>
                )}
                <div className={styles['expense-item__price']}>€ {parseFloat(expenseData.amount).toLocaleString('en-EN')}</div>
                <div className={styles['btns']}>
                    <button onClick={handleTitleChange}>✏️</button>
                    <button onClick={isDeletedHandler}>🗑️</button>
                </div>
            </div>
        </Card>
    )
}

export default ExpenseItem; 