import styles from './ExpenseDate.module.css'

const ExpenseDate = (props) => {
    const data = props.item;
    const dateObj = new Date(data.date);
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const month = data.date.toLocaleString('en-US', {month: 'long'});

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