import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import CustomModal from '../Utils/CustomModal';
import styles from './NewExpense.module.css'
import { Card, CardFooter, Image, Button, Progress, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const NewExpense = (props) => {
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
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-6"
                shadow="sm"
            >
                <CustomModal 
                    isOpen={isOpen} 
                    openModal={openModal} 
                    modalBody={
                        <ExpenseForm 
                            onSavedExpenseData={saveExpenseLiftUp} 
                            closeModal={closeModal}
                            currentId={currentId}/>}/>
            </Card>
        </div>
    )
}

export default NewExpense