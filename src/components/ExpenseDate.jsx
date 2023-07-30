import styles from './ExpenseDate.module.css'

const ExpenseDate = (props) => {
    const expenseDate = props.dates;
    const dateObj = new Date(expenseDate);
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const month = expenseDate.toLocaleString('en-US', {month: 'long'});

    return (
        <>
            <div className={styles['calendarDate']}>
                <div className={styles['month']}>{month}</div>
                <div className={styles['year']}>{year}</div>
                <div className={styles['day']}>{day}</div>
            </div>
        </>
    )
}

export default ExpenseDate