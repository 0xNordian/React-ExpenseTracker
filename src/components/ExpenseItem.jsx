import styles from './ExpenseItem.module.css'
import ExpenseDate from './ExpenseDate'

const ExpenseItem = (props) => {
    const expenseData = props.expense;
    const expenseDate = props.expense.date;

    return (
        <div className={styles['expense-item']}>
            <ExpenseDate dates={expenseDate}/>
            <div className={styles['expense-item__description']}>
                <h2>{expenseData.title}</h2>
                <div className={styles['expense-item__price']}>${expenseData.amount}</div>
            </div>
        </div>
    )
}

export default ExpenseItem; 