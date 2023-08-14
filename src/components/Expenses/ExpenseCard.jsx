import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import ExpenseFilter from './ExpenseFilter'
import CustomDropdown from '../Utils/CustomDropdown';
import { useState } from 'react';

const ExpenseCard = (props) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortProperty, setSortProperty] = useState('amount'); // Default sorting property

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
    const ascOrder = (a, b) => a[sortProperty] - b[sortProperty];
    const dscOrder = (a, b) => b[sortProperty] - a[sortProperty];

    const expensesCards = filteredExpenses
        .sort(sortOrder === 'asc' ? ascOrder : dscOrder)
        .map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} deleteExp={() => deleteSelExp(expense.id)} />
        ));


    //! NO EXPENSE FOUND
    if (props.expensesArr.length === 0) {
        return (
            <>
                {/* <div className={styles['filterAndCard']}>
                    <ExpenseFilter onFilterExpense={filteredYear} />
                </div> */}
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else if (expensesCards.length === 0) {
        return (
            <>
                <Card className={`${styles['expenses']} pl-6`}>
                    <div className={`${styles['filterAndCard']} flex justify-start mb-4 p-0`}>
                        <span>Year</span>
                        <ExpenseFilter onFilterExpense={filteredYear} initialYear={selectedYear} />
                    </div>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet for {selectedYear}! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else {
        //! EXPENSE RENDER
        return (
            <>
                <Card className={styles['expenses']}>
                    <div className={styles['filterAndCard']}>
                        <div className={`${styles['sort']}`}>
                            <span>Year</span>
                            <ExpenseFilter onFilterExpense={filteredYear} />
                        </div>
                        <div className={styles['order']}>
                            <div className={`${styles['sort']}`}>
                                <span>Sort By</span>
                                <CustomDropdown
                                    items={[
                                        { value: 'amount', label: 'Amount' },
                                        { value: 'date', label: 'Date' }
                                    ]}
                                    selectedValue={sortProperty}
                                    onAction={(selectedKey) => handleSortChange(selectedKey, sortOrder)}
                                    className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#659b5e] hover:text-[#283f3b]"
                                />
                            </div>
                            <div className={styles['sort']}>
                                <span>Order</span>
                                <CustomDropdown
                                    items={[
                                        { value: 'asc', label: '⬆️' },
                                        { value: 'dsc', label: '⬇️' }
                                    ]}
                                    selectedValue={sortOrder}
                                    onAction={(selectedKey) => handleSortChange(sortProperty, selectedKey)}
                                    className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#659b5e] hover:text-[#283f3b]"
                                    label={sortOrder === 'asc' ? '⬆️' : '⬇️'}
                                />
                            </div>
                        </div>
                    </div>
                    {expensesCards}
                </Card>
            </>
        )
    }
}

export default ExpenseCard;
