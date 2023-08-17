// ExpenseContext.js
import React from 'react';

const ExpenseContext = React.createContext({
    selectedYear: '',
    selectedCategory: '',
});

export default ExpenseContext;
