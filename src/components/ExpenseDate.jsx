import styles from './ExpenseDate.module.css'

const ExpenseDate = (props) => {
    const expenseDate = props.dates;
    const dateObj = new Date(expenseDate);
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const month = expenseDate.toLocaleString('en-US', {month: 'long'});

    return (
        <>
            <div className={styles['expense-date']}>
                <div className={styles['expense-date__month']}>{month}</div>
                <div className={styles['expense-date__year']}>{year}</div>
                <div className={styles['expense-date__day']}>{day}</div>
            </div>
        </>
    )
}

export default ExpenseDate