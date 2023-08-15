import React, { useState, useRef, useEffect } from 'react';
import styles from './expenseForm.module.css';
import { Input, Button, Checkbox } from "@nextui-org/react";
import btnAction from '../Styles/btnAction';
import CustomDropdown from '../Utils/CustomDropdown';


const ExpenseForm = (props) => {
    const todayDate = new Date();
    const maxDate = formatDate(todayDate); // Format today's date with leading zero
    const [titleError, setTitleError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [id, setId] = useState([1])
    const [isFuture, setIsFuture] = useState(false);
    const [isMultipleExp, setIsMultipleExp] = useState(false);
    const [formError, setFormError] = useState(false);
    const idRef = useRef(0);

    //! USER INPUT STATE
    const [userInput, setUserInput] = useState(() => {
        return {
            id: '',
            enteredTitle: '',
            enteredDate: maxDate,
            enteredAmount: '',
            enteredCategory: ''
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
            case 'category':
                setUserInput((prevState) => ({ ...prevState, enteredCategory: value }));
                break;
            default:
                break;
        }
    };

    //! SUBMIT FORM FUNCTION
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Submitting form...");

        const hasErrors = errorHandler();

        if (!hasErrors) {
            //? setId((prevId) => [...prevId, prevId.length + 1]) <-- Works outside the modal
            const newExpenseDate = new Date(userInput.enteredDate)
            const expenseData = {
                // id: `e${id[id.length - 1]}`, //?Works outside the modal
                id: `e${props.currentId}`,
                title: userInput.enteredTitle,
                amount: userInput.enteredAmount,
                date: newExpenseDate,
                displayCategory: selectedCategDisplay,
                backEndCategory: selectedCategory
            };
            console.log("expenseData: ", expenseData)
            //* LIFT SUBMITTED DATA
            props.onSavedExpenseData(expenseData);

            setFormError(false);

            //* RESTART FORM
            setUserInput({
                id: "",
                enteredTitle: "",
                enteredDate: maxDate,
                enteredAmount: "",
                enteredCategory: ""
            });

            // Reset the category fields
            setSelectedCategory("");
            setSelectedCategDisplay("");
        }
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
        carOcasionalParking: "Ocasional car parking",
        groseryFood: "Grosery food",
        leisureFood: "Restaurant"
    };

    const [selectedCategory, setSelectedCategory] = useState(() => "");
    const [selectedCategDisplay, setSelectedCategDisplay] = useState(() => "")

    const handleCategoryChange = (selectedItem) => {
        const selectedValue = expCategories[selectedItem]; // Get the corresponding value from expCategories
        setSelectedCategory(selectedItem);
        setSelectedCategDisplay(selectedValue);
        console.log('Category Error:', categoryError); // Add this line
    };

    const errorHandler = () => {
        let hasErrors = false;

        if (userInput.enteredTitle.trim().length < 3 || userInput.enteredTitle.trim().length === 0) {
            setTitleError(true);
            hasErrors = true;
        } else {
            setTitleError(false);
        }

        if (userInput.enteredAmount.trim().length === 0) { // Check if amount is empty
            setAmountError(true);
            hasErrors = true;
        } else {
            setAmountError(false);
        }

        if (selectedCategory.length === 0) {
            setCategoryError(true);
            hasErrors = true;
        } else {
            setCategoryError(false);
        }

        setFormError(hasErrors); // Set formError based on whether there are errors

        return hasErrors; // Return the hasErrors value
    }

    const isRequiredHandler = (hasErrors) => {
        if (hasErrors) {
            console.log("Please fix the form errors before submitting");
        } else {
            console.log("props.closeModal");
            props.closeModal(); // Call the closeModal function
            hasErrors = false;
        }
    };

    return (
        <section>
            {/* <h1 className="text-xl mb-4 uppercase text-[#283f3b] font-bold">Expense Tracker</h1> */}
            <form onSubmit={submitHandler}>
                <div className={styles['new-expense__controls']}>
                    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                        {/* <label htmlFor='expense-title'>Title</label> */}
                        <Input
                            isRequired
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
                            min='2020-01-01'
                            max={maxDate}
                            value={userInput.enteredDate || maxDate}
                            onChange={(e) => inputHandler('date', e.target.value)}
                        />
                        {isFuture && <p className={styles['error-message']}>Date cannot be in the future.</p>}
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                        <Input
                            isRequired
                            label="Amount"
                            className={amountError ? styles['amount-alert'] : ''}
                            type='number'
                            name='expense-amount'
                            id='expense-amount'
                            min='0.01'
                            step='0.01'
                            value={userInput.enteredAmount}
                            onChange={(e) => inputHandler('amount', e.target.value)}
                        />
                        {amountError && <p className={styles['error-message']}>Amount is required</p>}
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
                            // onAction={(e) => handleCategoryChange(e)} // Change this line
                            onAction={handleCategoryChange} // Change this line
                        />
                        {categoryError && <p className={styles['error-message']}>Category is required</p>}
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
                    <div>
                        {isMultipleExp ?
                            <Button
                                type='submit'
                                color="primary"
                                className={btnAction.regularActionBtn}
                            >
                                Create
                            </Button>
                            :
                            <Button
                                onClick={() => {
                                    const hasErrors = errorHandler();
                                    isRequiredHandler(hasErrors);
                                }}
                                type='submit'
                                color="primary"
                                className={btnAction.regularActionBtn}
                            >
                                Create
                            </Button>

                        }
                    </div>
                </div>
            </form>
        </section>
    );
};

export default ExpenseForm;