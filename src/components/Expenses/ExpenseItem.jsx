import styles from './ExpenseItem.module.css'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'

const ExpenseItem = (props) => {
    const expenseData = props.expense;
    const expenseDate = props.expense.date;

    return (
        <Card className={styles['expense-item']}>
            <ExpenseDate dates={expenseDate}/>
            <div className={styles['expense-item__description']}>
                <h2>{expenseData.title}</h2>
                <div className={styles['expense-item__price']}>${expenseData.amount}</div>
            </div>
        </Card>
    )
}

export default ExpenseItem; 