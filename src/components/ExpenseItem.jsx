import styles from './ExpenseItem.module.css'

const ExpenseItem = (props) => {

    return (
        <div className={styles['expense-item']}> 
            <div>{props.expense.date.toLocaleDateString()}</div>
            <div className={styles['expense-item__description']}> 
                <h2>{props.expense.title}</h2>
                <div className={styles['expense-item__price']}>${props.expense.amount}</div>
            </div>
            {/* <button onClick={handleNewExpenseDate}>new</button> */}
        </div>
    )
}

export default ExpenseItem;