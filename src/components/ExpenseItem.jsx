import styles from './ExpenseItem.module.css'
import ExpenseDate from './ExpenseDate'

const ExpenseItem = (props) => {
    const data = props.expense;
    const expenses = props.expenses;

    return (
        <div className={styles['expense-item']}>
            <ExpenseDate item={data}/>
            <div className={styles['expense-item__description']}>
                <h2>{data.title}</h2>
                <div className={styles['expense-item__price']}>${data.amount}</div>
            </div>
        </div>
    )
}

export default ExpenseItem; 