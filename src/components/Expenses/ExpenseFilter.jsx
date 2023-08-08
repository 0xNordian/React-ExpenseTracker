import React, { useState } from 'react'
import styles from './ExpenseFilter.module.css'

const ExpenseFilter = (props) => {
    const [setFilteredYear] = useState("");

    const filterYearHandler = (e) => {
        const selectedYear = e.target.value;
        setFilteredYear(selectedYear)
        // console.log("filtered year: ",selectedYear)
        props.onFilterExpense(selectedYear);
    }


    return (
        <div className={styles['expenses-filter']}>
            <div className={styles['expenses-filter__control']}>
                <label>Filter by year</label>
                <select onChange={filterYearHandler}>
                    <option value='All'>All</option>
                    <option value='2023'>2023</option>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                </select>
            </div>
        </div>
    );
}

export default ExpenseFilter