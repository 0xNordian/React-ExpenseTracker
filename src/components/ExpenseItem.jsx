import styles from './ExpenseItem.module.css'

const ExpenseItem = (props) => {
    const data = props.expense;
    const dateObj = new Date(data.date);
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() - 1;

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <div className={styles['expense-item']}>
            <div className={styles['calendarDate']}>
                <div className={styles['month']}>{monthNames[month]}</div>
                <div className={styles['year']}>{year}</div>
                <div className={styles['day']}>{day}</div>
            </div>
            <div className={styles['expense-item__description']}>
                <h2>{data.title}</h2>
                <div className={styles['expense-item__price']}>${data.amount}</div>
            </div>
        </div>
    )
}

export default ExpenseItem;