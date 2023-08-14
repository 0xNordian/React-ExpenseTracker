import React, { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import CustomModal from '../Utils/CustomModal';
import styles from './NewExpense.module.css'
import { Card, CardFooter, Image, Button, Progress, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const NewExpense = (props) => {
    const arr = props.expensesArr;
    const [currentId, setCurrentId] = useState(1);
    const [numExp, setNumExp] = useState(() => 0)
    const [totalExp, setTotalExp] = useState(0);
    const saveExpenseLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        props.addExpenseHandler(expenseData);
        setCurrentId(prev => prev + 1);
    };

    useEffect(() => {
        setNumExp(props.expensesArr.length);
        totalExpHandler();
    }, [props.expensesArr]);

    const totalExpHandler = () => {
        const total = arr.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotalExp(total);
    }
    console.log("TotalExp: ", totalExp)

    const { isOpen, onOpenChange } = useDisclosure();
    const closeModal = () => onOpenChange(false);
    const openModal = () => onOpenChange(true);

    return (
        <div className={styles['new-expense']}>
            <div>
                <h2># Expenses</h2>
                <p className={`${styles['expense-item__total']}`}>{numExp}</p>
            </div>
            <div>
                <h2>Total Expenses</h2>
                <p className={`${styles['expense-item__total']}`}>{totalExp}</p>
            </div>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-2"
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
                            currentId={currentId} />} />
            </Card>
        </div>
    )
}

export default NewExpense