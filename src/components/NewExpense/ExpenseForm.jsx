import React, { useState, useRef } from 'react';
import styles from './ExpenseForm.module.css';
import { Input, Button, Checkbox } from "@nextui-org/react";
import btnAction from '../Styles/btnAction';
import CustomDropdown from '../Utils/CustomDropdown';


const ExpenseForm = (props) => {
    // console.log("ExpenseForm rendered"); Check if the component get rendered every time I open the modal
    const todayDate = new Date();
    const maxDate = formatDate(todayDate); // Format today's date with leading zero
    const [titleError, setTitleError] = useState(false);
    const [id, setId] = useState([1])
    const [isFuture, setIsFuture] = useState(false);
    const [isMultipleExp, setIsMultipleExp] = useState(false);
    const idRef = useRef(0);

    //! USER INPUT STATE
    const [userInput, setUserInput] = useState(() => {
        return {
            id: '',
            enteredTitle: '',
            enteredDate: maxDate,
            enteredAmount: ''
        };
    });

    //! INPUT HANDLER FUNCTION
    const inputHandler = (label, value) => {
        switch (label) {
            case 'title':
                setUserInput((prevState) => ({ ...prevState, enteredTitle: value }));
                setTitleError(value.length < 3);
                break;
            case 'date':
                setUserInput((prevState) => ({ ...prevState, enteredDate: value }));
                setIsFuture(value > todayDate);
                break;
            case 'amount':
                setUserInput((prevState) => ({ ...prevState, enteredAmount: value }));
                break;
            default:
                break;
        }
    };

    //! SUBMIT FORM FUNCTION
    const submitHandler = (e) => {
        e.preventDefault();

        //? setId((prevId) => [...prevId, prevId.length + 1]) <-- Works outside the modal
        const newExpenseDate = new Date(userInput.enteredDate)
        const expenseData = {
            // id: `e${id[id.length - 1]}`, //?Works outside the modal
            id: `e${props.currentId}`,
            title: userInput.enteredTitle,
            amount: userInput.enteredAmount,
            date: newExpenseDate
        };
        console.log("expenseData: ", expenseData)
        //* LIFT SUBMITTED DATA
        props.onSavedExpenseData(expenseData);

        //* RESTART FORM
        setUserInput({
            id: "",
            enteredTitle: "",
            enteredDate: maxDate,
            enteredAmount: "",
        });
    };

    //! DATE FORMAT FUNCTION
    function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;

        return `${year}-${formattedMonth}-${formattedDay}`;
        // return `${formattedDay}-${formattedMonth}-${year}`;
    }

    //!Manage Multiple Expenses Seletor
    const multipleExpHandler = () => setIsMultipleExp(prevState => !prevState);

    const expCategories = {
        rent: "Rent",
        mortage: "Mortage",
        electricity: "Electricity",
        waterSupply: "Water",
        communicationPlan: "Internet and Communication Plan",
        carLoan: "Car loan",
        carPurchase: "Car Purchase",
        carGas: "Car gas",
        carRentParking: "Rent car parking",
        carOcasionalParking: "Ocasional car parking"
    };

    const [selectedCategory, setSelectedCategory] = useState(() => "");
    const [selectedCategDisplay, setSelectedCategDisplay] = useState(() => "")

    const handleCategoryChange = (selectedItem) => {
        const selectedValue = expCategories[selectedItem]; // Get the corresponding value from expCategories
        setSelectedCategory(selectedItem);
        setSelectedCategDisplay(selectedValue);
    };
    // console.log("selectedCategDisplay: ", selectedCategDisplay)
    // console.log("selectedCategory: ", selectedCategory)

    return (
        <section>
            {/* <h1 className="text-xl mb-4 uppercase text-[#283f3b] font-bold">Expense Tracker</h1> */}
            <form onSubmit={submitHandler}>
                <div className={styles['new-expense__controls']}>
                    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                        {/* <label htmlFor='expense-title'>Title</label> */}
                        <Input
                            label="Title"
                            className={titleError ? styles['title-alert'] : ''}
                            type='text'
                            name='expense-title'
                            id='expense-title'
                            // placeholder='(E.g: Pizza)'
                            value={userInput.enteredTitle}
                            onChange={(e) => inputHandler('title', e.target.value)}
                        />
                        {titleError && <p className={styles['error-message']}>Title must have at least three characters</p>}
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                        <Input
                            type='date'
                            name='expense-date'
                            id='expense-date'
                            // placeholder=''
                            min='2020-01-01'
                            max={maxDate}
                            value={userInput.enteredDate || maxDate}
                            onChange={(e) => inputHandler('date', e.target.value)}
                        />
                        {isFuture && <p className={styles['error-message']}>Date cannot be in the future.</p>}
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                        <Input
                            label="Amount"
                            type='number'
                            name='expense-amount'
                            id='expense-amount'
                            min='0.01'
                            step='0.01'
                            value={userInput.enteredAmount}
                            onChange={(e) => inputHandler('amount', e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-2 '>
                        {selectedCategDisplay && <span>Category</span>}
                        <CustomDropdown
                            items={Object.entries(expCategories).map(([key, value]) => ({
                                value: key,      // Corrected this line
                                label: value
                            }))}
                            selectedValue={selectedCategory}
                            label={selectedCategDisplay || "Select Category"}
                            onAction={(e) => handleCategoryChange(e)} // Change this line
                        />
                    </div>
                </div>
                <div className="w-[100px]">
                </div>
                <div className="flex gap-4 mb-6">
                    <Checkbox onChange={multipleExpHandler} radius="lg">Create multiple expenses</Checkbox>
                </div>

                <div className={`${styles['new-expense__actions']} flex justify-end gap-3 `}>
                    <Button
                        onClick={props.closeModal}
                        className={btnAction.dangerActionBtn}>

                        Cancel
                    </Button>

                    {isMultipleExp ?
                        <Button
                            type='submit'
                            color="primary"
                            className={btnAction.regulatActionBtn}
                        >
                            Create
                        </Button>
                        :
                        <Button
                            onClick={props.closeModal}
                            type='submit'
                            color="primary"
                            className={btnAction.regulatActionBtn}
                        >
                            Create
                        </Button>}
                </div>
            </form>
        </section>
    );
};

export default ExpenseForm;