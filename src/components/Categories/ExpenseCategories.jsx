import React from 'react';

const ExpenseCategories = () => {
    const expCategories = {
        house: {
            rent: "Rent",
            mortage: "Mortage",
            electricity: "Electricity",
            waterSupply: "Water",
            communicationPlan: "Internet and Communication Plan"
        },
        car: {
            carLoan: "Car loan",
            carPurchase: "Car Purchase",
            carGas: "Car gas",
            carRentParking: "Rent car parking",
            carOcasionalParking: "Ocasional car parking"
        }
    }};

    const renderExpenseCategories = (expCategories) => {
        return (
            <p></p>
            )
}

export default ExpenseCategories;