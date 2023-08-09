import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import ExpenseFilter from './ExpenseFilter'
import { useState } from 'react';

const ExpenseCard = (props) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortProperty, setSortProperty] = useState(''); // Default sorting property

    //! FILTERED YEAR SELECTED BY THE USER
    const filteredYear = (selectedYear) => {
        setSelectedYear(selectedYear);
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

    //! Handle sorting change (both order and property)
    const handleSortChange = (property, order) => {
        setSortProperty(property);
        setSortOrder(order);
    };

    //! DELETE EXPENSE FUNCTION
    function deleteSelExp(id) {
        props.deleteExp(id);
    }

    //! DYNAMIC EXPENSE CARD GENERATION
    //! Determine sorting functions based on sortProperty
    const ascAmountOrder = (a, b) => a.amount - b.amount;
    const dscAmountOrder = (a, b) => b.amount - a.amount;
    const ascDateOrder = (a, b) => a.date - b.date;
    const dscDateOrder = (a, b) => b.date - a.date;
    let ascOrder, dscOrder;
    switch (sortProperty) {
        case 'amount':
            ascOrder = ascAmountOrder;
            dscOrder = dscAmountOrder;
            break;
        case 'date':
            ascOrder = ascDateOrder;
            dscOrder = dscDateOrder;
            break;
        default:
            ascOrder = ascAmountOrder;
            dscOrder = dscAmountOrder;
            break;
    }

    const expensesCards = filteredExpenses
        .sort(sortOrder === 'asc' ? ascOrder : dscOrder)
        .map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} deleteExp={() => deleteSelExp(expense.id)} />
        ));


    //! NO EXPENSE FOUND
    if (props.expensesArr.length === 0) {
        return (
            <>
                <div className={styles['filterAndCard']}>
                    <ExpenseFilter onFilterExpense={filteredYear} />
                </div>
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else if (expensesCards.length === 0) {
        return (
            <>
                <div className={styles['filterAndCard']}>
                    <ExpenseFilter onFilterExpense={filteredYear} />
                </div>
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet for {selectedYear}! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else {
        //! EXPENSE RENDER
        return (
            <>
                <div className={styles['filterAndCard']}>
                    <ExpenseFilter onFilterExpense={filteredYear} />
                </div>
                <Card className={styles['expenses']}>
                    <div className={styles['order']}>
                        <span>Sort By</span>
                        <select className={styles['property']} value={sortProperty} onChange={(e) => handleSortChange(sortOrder, e.target.value)}>
                            <option value='amount'>Amount</option>
                            <option value='date'>Date</option>
                        </select>
                        <span>Order</span>
                        <select className={styles['orderSelect']} value={sortOrder} onChange={(e) => handleSortChange(sortProperty, e.target.value)}>
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
