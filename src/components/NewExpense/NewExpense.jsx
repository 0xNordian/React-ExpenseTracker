import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import CustomModal from '../Utils/CustomModal';
import styles from './NewExpense.module.css'
import { Card, CardFooter, Image, Button, Progress, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const NewExpense = (props) => {
    const saveExpenseLiftUp = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData
        };
        props.addExpenseHandler(expenseData);
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const closeModal = () => onOpenChange(false);
    const openModal = () => onOpenChange(true);

    return (
        <div className={styles['new-expense']}>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-6"
                shadow="sm"
            >
                <CustomModal 
                    isOpen={isOpen} 
                    closeModal={closeModal} 
                    openModal={openModal} 
                    modalBody={
                        <ExpenseForm 
                            onSavedExpenseData={saveExpenseLiftUp} 
                            closeModal={closeModal}/>}/>
            </Card>
        </div>
    )
}

export default NewExpense