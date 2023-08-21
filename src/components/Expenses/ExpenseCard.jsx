import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'
import CustomDropdown from '../Utils/CustomDropdown';
import { useState, useEffect, useContext } from 'react';
import NewExpense from '../NewExpense/NewExpense';
import { DefaultAccordion } from '../Utils/DefaultAccordion';
// import ExpenseContext from '../Context/ExpenseContext';
import TableView from "../TableView/TableView.jsx"
import data from "../TableView/data.js"
import CustomBtn from '../Utils/CustomBtn';

const ExpenseCard = (props) => {
    const [selectedYear, setSelectedYear] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortProperty, setSortProperty] = useState('amount'); // Default sorting property
    const [selectedCategory, setSelectedCategory] = useState('All');
    const initialSet = props.initialYear ? new Set([props.initialYear]) : new Set(["All"]);
    const [selectedKeys, setSelectedKeys] = useState(initialSet);
    const [viewToggle, setViewToggle] = useState("Card");

    //! Expense Category
    const expCategories = {
        all: "All",
        rent: "Rent",
        mortage: "Mortage",
        electricity: "Electricity",
        waterSupply: "Water",
        communicationPlan: "Internet and Communication Plan",
        carLoan: "Car loan",
        carPurchase: "Car Purchase",
        carGas: "Car gas",
        carRentParking: "Rent car parking",
        carOcasionalParking: "Ocasional car parking",
        groseryFood: "Grosery food",
        leisureFood: "Restaurant",
        shopping: "Shopping"
    };

    //! Expense Year
    const expYears = {
        all: "All",
        2019: "2019",
        2020: "2020",
        2021: "2021",
        2022: "2022",
        2023: "2023"
    };

    //! EXPENSES FROM APP.jsx FILTERED BY USER SELECTION
    const filteredExpenses = props.expensesArr.filter(item => {
        const yearFilter = selectedYear === "" || selectedYear === "All" || item.date.getFullYear().toString() === selectedYear;
        return yearFilter;
    });


    const filteredCategoryExp = filteredExpenses.filter(item => {
        const categoryFilter = selectedCategory === "" || selectedCategory === "All" || item.displayCategory === selectedCategory;
        return categoryFilter;
    });


    //! FILTERED YEAR SELECTED BY THE USER
    const filteredYear = (selectedYear) => {
        setSelectedYear(selectedYear);
    }

    //! Filtered category by user
    // const filterCategory = (selectedCategory) => {
    //     setSelectedCategory(selectedCategory)
    // }

    const filterCategory = (selectedCategory) => {
        console.log("TableView: ", selectedCategory)
        setSelectedCategory(selectedCategory)
    }

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

    const expensesCards = filteredCategoryExp
        .sort(sortOrder === 'asc' ? ascOrder : dscOrder)
        .map((expense) => (
            <ExpenseItem
                key={expense.id}
                expense={expense}
                deleteExp={() => deleteSelExp(expense.id)}
                onFilterCategory={filterCategory}
                id={expense.id}
            />
        ));
    // console.log("expensesCards: ", expensesCards)

    const [numExp, setNumExp] = useState(() => 0)
    const [totalExp, setTotalExp] = useState(0);

    useEffect(() => {
        setNumExp(filteredCategoryExp.length);
        totalExpHandler();
    }, [filteredCategoryExp]);

    const totalExpHandler = () => {
        const total = filteredCategoryExp.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotalExp(total);
    }

    const resetFiltersHandler = () => {
        setSelectedCategory("All");
        setSelectedYear((prev) => prev = "All");
    }

    const viewToggleHandler = () => {
        setViewToggle((prev) => prev === "Card" ? "Table" : "Card");
    };

    const viewBtnTitle = viewToggle === "Card" ? "Table" : "Card";

    data.updateExpData(filteredCategoryExp);

    const handleTitleChange = (expenseId) => {
        // Find the expense by ID
        const expenseToEdit = filteredCategoryExp.find(expense => expense.id === expenseId);

        const updateExpenses = filteredCategoryExp.map(expense => {
            if (expense.id === expenseId) {
                return { ...expense, title: expenseToEdit.title }
            }
            return expense;
        }
        )};

        //! NO EXPENSE FOUND
        if (props.expensesArr.length === 0) {
            return (
                <>
                    <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} onExpCategories={expCategories} />
                    <Card className={styles['expenses']}>
                        <h2 className={styles['expenses__title']}>You don't have any expenses registered yet! 🤷‍♂️</h2>
                    </Card>
                </>
            )
        } else if (expensesCards.length === 0) {
            return (
                <>
                    {/* <ExpenseContext.Provider value={{ selectedYear, selectedCategory }}> */}
                    <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} onExpCategories={expCategories} />
                    <Card className={`${styles['expenses']} pl-6`}>
                        <DefaultAccordion filterBody={
                            <>
                                <div className={`${styles['filterAndCard']} flex justify-between items-center mb-6 p-0 gap-4`}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <span>Year</span>
                                        <CustomDropdown
                                            items={Object.entries(expYears).map(([key, value]) => ({
                                                value: value,      // Corrected this line
                                                label: value
                                            }))}
                                            selectedValue={selectedYear}
                                            onAction={(selectedKey) => filteredYear(selectedKey)}
                                            className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#659b5e] hover:text-[#283f3b]"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <span>Category</span>
                                        <CustomDropdown
                                            items={Object.entries(expCategories).map(([key, value]) => ({
                                                value: value,      // Corrected this line
                                                label: value
                                            }))}
                                            selectedValue={selectedCategory}
                                            onAction={(selectedKey) => filterCategory(selectedKey)}
                                            className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#659b5e] hover:text-[#283f3b]"
                                        />
                                    </div>
                                    <div className="ml-auto mr-2">
                                        <button className="" onClick={resetFiltersHandler}>Reset</button>
                                    </div>
                                </div>
                                <h2 className={styles['expenses__title']}>You don't have any expenses registered yet for {selectedCategory} in {selectedYear}! 🤷‍♂️</h2>
                            </>
                        }>
                        </DefaultAccordion>
                    </Card>
                    {/* </ExpenseContext.Provider> */}
                </>
            )
        } else {
            //! EXPENSE RENDER
            return (
                <>
                    {/* <ExpenseContext.Provider value={{ selectedYear, selectedCategory }}> */}
                    <NewExpense expensesArr={props.expensesArr} addExpenseHandler={props.addExpenseHandler} numExp={numExp} totalExp={totalExp} onExpCategories={expCategories} />

                    <Card className={`${styles['expenses']} p-10`}>
                        <DefaultAccordion onAccordionName={"Filters"} filterBody={
                            <div className={`${styles.filterAndCard} ${styles.glass} flex justify-around gap-4 `}>
                                <div className={`${styles['sort']} flex flex-col`}>
                                    <span>Year</span>
                                    <CustomDropdown
                                        items={Object.entries(expYears).map(([key, value]) => ({
                                            value: value,      // Corrected this line
                                            label: value
                                        }))}
                                        selectedValue={selectedYear}
                                        onAction={(selectedKey) => filteredYear(selectedKey)}
                                        className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#99ddc8] hover:text-[#283f3b] hover:border-[#283f3b]"
                                    />
                                </div>
                                <div className={`${styles['sort']} flex flex-col`}>
                                    <span>Category</span>
                                    <CustomDropdown
                                        items={Object.entries(expCategories).map(([key, value]) => ({
                                            value: value,      // Corrected this line
                                            label: value
                                        }))}
                                        selectedValue={selectedCategory}
                                        onAction={(selectedKey) => filterCategory(selectedKey)}
                                        className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#99ddc8] hover:text-[#283f3b] hover:border-[#283f3b]"
                                    />
                                </div>
                                <div className={`${styles['sort']} flex flex-col`}>
                                    <span>Sort By</span>
                                    <CustomDropdown
                                        items={[
                                            { value: 'amount', label: 'Amount' },
                                            { value: 'date', label: 'Date' }
                                        ]}
                                        selectedValue={sortProperty}
                                        onAction={(selectedKey) => handleSortChange(selectedKey, sortOrder)}
                                        className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#99ddc8] hover:text-[#283f3b] hover:border-[#283f3b]"
                                    />
                                </div>
                                <div className={`${styles['sort']} flex flex-col`}>
                                    <span>Order</span>
                                    <CustomDropdown
                                        items={[
                                            { value: 'asc', label: '⬆️' },
                                            { value: 'dsc', label: '⬇️' }
                                        ]}
                                        selectedValue={sortOrder}
                                        onAction={(selectedKey) => handleSortChange(sortProperty, selectedKey)}
                                        className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#99ddc8] hover:text-[#283f3b] hover:border-[#283f3b]"
                                        label={sortOrder === 'asc' ? '⬆️' : '⬇️'}
                                    />
                                </div>
                                <button className="transform hover:scale-105 transition-transform duration-300" onClick={resetFiltersHandler}>Reset</button>
                            </div>
                        }>
                        </DefaultAccordion>
                        <div className={`${""} text-white mt-4`}>
                            <button className={`${"table-view"} text-primary mb-4 relative left-5`} onClick={viewToggleHandler}>{`◎ ${viewBtnTitle} view`}</button>
                        </div>
                        {viewToggle === "Card" ?
                        <div className="flex flex-col gap-3">
                            {expensesCards}
                        </div> :
                            <TableView
                                tableExpData={data.expData}
                                columns={data.columns}
                                deleteExp={deleteSelExp}
                                editTitle={handleTitleChange}
                                filterByCategory={filterCategory}
                            />}
                    </Card>
                    {/* </ExpenseContext.Provider> */}
                </>
            )
        }
    }

    export default ExpenseCard;