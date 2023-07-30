import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'

const ExpenseCard = (props) => {
    const expensesCards = props.expensesArr.map((expense) => <ExpenseItem key={expense.id} expense={expense} />);
    if (expensesCards.length === 0) {
        return (
            <>
                <div className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>No expenses found.</h2>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={styles['expenses']}>
                {expensesCards}
            </div>
        </>
    )
}

export default ExpenseCard