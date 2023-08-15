import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import ExpenseFilter from './ExpenseFilter'
import CustomDropdown from '../Utils/CustomDropdown';
import { useState, useEffect } from 'react';
import NewExpense from '../NewExpense/NewExpense';

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

    const [numExp, setNumExp] = useState(() => 0)
    const [totalExp, setTotalExp] = useState(0);

    useEffect(() => {
        setNumExp(filteredExpenses.length);
        totalExpHandler();
    }, [filteredExpenses]);

    const totalExpHandler = () => {
        const total = filteredExpenses.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotalExp(total);
    }

    //! NO EXPENSE FOUND
    if (props.expensesArr.length === 0) {
        return (
            <>
                <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} />
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>You don't have any expenses registered yet! 🤷‍♂️</h2>
                </Card>
            </>
        )
    } else if (expensesCards.length === 0) {
        return (
            <>
                <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} />
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
                <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} />
                <Card className={`${styles['expenses']} p-10`}>
                    <div className={`${styles.filterAndCard} ${styles.glass}`}>
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
