import React from 'react'
import ExpenseForm from './ExpenseForm'
import styles from './NewExpense.module.css'
import { Card, CardFooter, Image, Button, Progress } from "@nextui-org/react";

const NewExpense = (props) => {
    const saveExpenseLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        props.addExpenseHandler(expenseData);
    };

    return (
        <div className={styles['new-expense']}>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-6"
                shadow="sm"
            >
                <ExpenseForm onSavedExpenseData={saveExpenseLiftUp} />
            </Card>
        </div>
    )
}

export default NewExpense