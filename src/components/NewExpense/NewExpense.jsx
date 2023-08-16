import React, { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import CustomModal from '../Utils/CustomModal';
import styles from './newExpense.module.css'
import { Card, CardFooter, Image, Button, Progress, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const NewExpense = (props) => {
    // console.log("props.totalExp: ", props.totalExp)
    const [currentId, setCurrentId] = useState(1);
    const saveExpenseLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        props.addExpenseHandler(expenseData);
        setCurrentId(prev => prev + 1);
    };

    const { isOpen, onOpenChange } = useDisclosure();
    const closeModal = () => onOpenChange(false);
    const openModal = () => onOpenChange(true);

    return (
        <div className={styles['new-expense']}>
            <div>
                <h2># Expenses</h2>
                <p className={`${styles['expense-item__total']} ${styles.glass}`}>{props.numExp}</p>
            </div>
            <div>
                <h2>Total Expenses</h2>
                <p className={`${styles['expense-item__total']} ${styles.glass}`}>€ {parseFloat(props.totalExp).toLocaleString('en-EN')}</p>
            </div>
            <Card
                isBlurred
                className="border-none bg-background/25 dark:bg-default-100/50 max-w-[610px] p-2 text-2xl"
                shadow="sm"
            >
                <CustomModal
                    modalBtnTitle="+"
                    modalInnerTitle="Add an expense"
                    isOpen={isOpen}
                    openModal={openModal}
                    modalBody={
                        <ExpenseForm
                            onSavedExpenseData={saveExpenseLiftUp}
                            closeModal={closeModal}
                            currentId={currentId}
                            onExpCategories={props.onExpCategories} 
                        />}
                />
            </Card>
        </div>
    )
}

export default NewExpense