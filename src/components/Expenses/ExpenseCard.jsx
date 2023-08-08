import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import ExpenseFilter from './ExpenseFilter'
import { useState } from 'react';

const ExpenseCard = (props) => {
    const [selectedYear, setSelectedYear] = useState("");

    //! FILTERED YEAR SELECTED BY THE USER
    const filteredYear = (year) => {
        setSelectedYear(year);
        console.log("Selected year from expense card: ", year);
    }

    //! EXPENSES FROM APP.jsx FILTERED BY USER SELECTION
    const filteredExpenses = props.expensesArr.filter(item => {
        if (selectedYear === "") {
            return true;
        } else if (selectedYear === "All") {
            return item
        } else {
            return item.date.getFullYear().toString() === selectedYear;
        }
    });

    //! DYNAMIC EXPENSE CARD GENERATION
    const expensesCards = filteredExpenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} />);
    
    //! NO EXPENSE FOUND
    if (expensesCards.length === 0) {
        return (
            <>
                <ExpenseFilter onFilterExpense={filteredYear} />
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>No expenses found.</h2>
                </Card>
            </>
        )
    }

    //! EXPENSE RENDER
    return (
        <>
            <ExpenseFilter onFilterExpense={filteredYear} />
            <Card className={styles['expenses']}>
                {expensesCards}
            </Card>
        </>
    )
}

export default ExpenseCard;
