import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import ExpenseFilter from './ExpenseFilter'
import { useState } from 'react';

const ExpenseCard = (props) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    //! FILTERED YEAR SELECTED BY THE USER
    const filteredYear = (selectedYear) => {
        setSelectedYear(selectedYear);
        // console.log("Selected year from expense card: ", year);
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

    //! DELETE EXPENSE FUNCTION
    function deleteSelExp(id) {
        // expensesCards.forEach((item) => props.deleteExp(item.key));
        props.deleteExp(id);
    }

    //! DYNAMIC EXPENSE CARD GENERATION
    const ascOrder = (a, b) => a.amount - b.amount;
    const dscOrder = (a, b) => b.amount - a.amount;
    const expensesCards = filteredExpenses
        .sort(sortOrder === "asc" ? ascOrder : dscOrder)
        .map((expense) => <ExpenseItem key={expense.id} expense={expense} deleteExp={deleteSelExp} />);

    //! NO EXPENSE FOUND
    if (props.expensesArr.length === 0) {
        return (
            <>
                <ExpenseFilter onFilterExpense={filteredYear} />
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else if (expensesCards.length === 0) {
        return (
            <>
                <ExpenseFilter onFilterExpense={filteredYear} />
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet for {selectedYear}! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else {
        //! EXPENSE RENDER
        return (
            <>
                <ExpenseFilter onFilterExpense={filteredYear} />
                <Card className={styles['expenses']}>
                    <div className={styles['order']}>
                        <span>Order</span>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value='dsc'>⬇️</option>
                            <option value='asc'>⬆️</option>
                        </select>
                    </div>
                    {expensesCards}
                </Card>
            </>
        )
    }
}

export default ExpenseCard;
